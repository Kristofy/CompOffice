'use client';

import { useCallback, useEffect, useMemo, useOptimistic, useState } from 'react';

import toast from 'react-hot-toast';
import { set, string, z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DataHandlerForm from '@/forms/components/form/data-handler-form';
import { ContextMenuField } from '@/forms/components/table/data-handler-list';
import DataHandlerTable, { OptimisticAction } from '@/forms/components/table/data-handler-table';
import { unitValidator as dataHandler } from '@/forms/schemas/services';
import { unit } from '@prisma/client';
import { serverCreate, serverDel, serverEdit, trpc } from '@/trpc/client/client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataHandler } from '../type-info';


export default function EditableList<T extends object>({
    dataHandler
}: {
    dataHandler: DataHandler<T>;
}) {

    const utils = trpc.useUtils();

    const useEditMutation = serverEdit(dataHandler);
    const useCreateMutation = serverCreate(dataHandler);
    const useDelMutation = serverDel(dataHandler);

    const editMutation = useEditMutation({ onSuccess(input) { utils.get[dataHandler.tableName as any]?.invalidate(); }, })
    const createMutation = useCreateMutation({ onSuccess(input) { utils.get[dataHandler.tableName as any]?.invalidate(); }, })
    const delMutation = useDelMutation({ onSuccess(input) { utils.get[dataHandler.tableName as any]?.invalidate(); }, });

    const [open, setOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<T | undefined>(undefined);
    const [action, setAction] = useState<'edit' | 'new' | 'delete'>('new');
    const [currentRow, setCurrentRow] = useState<T & Record<string, any> | undefined>(undefined);
    const [list, setList] = useState<(T & Record<string, any>)[]>([]);


    const handleRowClick = useCallback((data: T & Record<string, any>, index: number) => {
        console.log('Row Click', data, index);
        setCurrentRow(data);
        setAction('edit');
        setOpen(true);
    }, []);

    const handleSubmit = useCallback(async (payload: T) => {
        try {
            if (action === 'edit') {
                await editMutation.mutateAsync(payload);
            } else if (action === 'new') {
                await createMutation.mutateAsync(payload);
            } else if (action === 'delete') {
                await delMutation.mutateAsync(payload);
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('Unexpected Error');
            }
            return false;
        }

        const successMsg = action === 'edit' ? 'Updated' : action === 'new' ? 'Created' : 'Deleted';
        toast.success(successMsg);
        return true;
    }, [action, editMutation, createMutation, delMutation]);

    const contextMenu: ContextMenuField<T>[] = useMemo(
        () => [
            {
                name: 'Copy',
                onClick: (data, key) => {
                    navigator.clipboard.writeText(data[key]);
                },
            },
            {
                name: 'Delete',
                onClick: (data, key) => {
                    setSelectedEntry(data);
                    setConfirmDialogOpen(true);
                    setAction('delete');
                },
            },
            {
                name: 'Edit',
                onClick: (data, key) => {
                    setCurrentRow(data);
                    setAction('edit');
                    setOpen(true);
                },
            },
            {
                name: 'New',
                onClick: (data, key) => {
                    console.log('New', data, key);
                    setAction('new');
                    setOpen(true);
                },
            },
        ],
        []
    );

    const [optimisticUpdate, setOptimisticUpdate] = useState<OptimisticAction<T> | undefined>(undefined);
    const handleOptimisticUpdate = useCallback((data: T) => {
        setOptimisticUpdate({
            type: 'update',
            payload: data,
        });
        setOpen(false);
    }, []);


    const formElement = useMemo(() => {
        return (
            <DataHandlerForm
                dataHandler={dataHandler}
                onSubmit={handleOptimisticUpdate}
                currentFields={action === 'edit' ? currentRow : undefined}
                data={list}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);


    const tableElement = useMemo(() => {
        console.log("Table Element");

        return (
            <DataHandlerTable
                dataHandler={dataHandler}
                onRowClick={handleRowClick}
                contextMenuFields={contextMenu}
                optimisticUpdate={optimisticUpdate}
                handleSubmit={handleSubmit}
                setList={setList}
            />
        )
    }, [contextMenu, dataHandler, handleRowClick, handleSubmit, optimisticUpdate]);

    return (
        <>
            <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>

                <Dialog open={open} onOpenChange={setOpen}>
                    {tableElement}
                    <DialogContent style={{ minWidth: '94.375%', minHeight: '90%' }}>
                        <div className="w-full h-full">
                            {formElement}
                        </div>
                    </DialogContent>
                </Dialog>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this entry. ({!!selectedEntry && 'id' in selectedEntry ? selectedEntry.id as number : ''})
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-destructive hover:bg-primary'
                            onClick={() => {
                                if (!selectedEntry) {
                                    toast.error('No unit selected');
                                    return;
                                }
                                setOptimisticUpdate({
                                    type: 'delete',
                                    payload: selectedEntry,
                                });
                            }}
                        >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>

    );
}
