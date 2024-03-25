'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface ValidatorListOrder<T> {
	prop: keyof T;
	order: 'ASC' | 'DESC';
}

export default function ValidatorListHeader<T>({
	sortBy,
	setSortBy,
	// applyFilter,
	filterElements,
}: {
	sortBy: { prop: keyof T; order: 'ASC' | 'DESC' };
	setSortBy: (sortBy: ValidatorListOrder<T>) => void;
	// applyFilter: (filter: (target: any, data: T) => boolean, value: string, index: number) => void;
	filterElements: Record<keyof T, JSX.Element | null>;
}) {
	const setDefaultHeader = useCallback((): ReactNode => {
		return (
			<div className="flex flex-row justify-evenly">
				{Object.entries<JSX.Element | null>(filterElements).map(([key, value]) => (
					<div key={key} className="w-full">
						<Popover>
							<PopoverTrigger asChild className="w-full">
								<Button variant="default" className="rounded-none focus-visible:ring-0">
									<span>{key}</span> &nbsp;&nbsp;
									{sortBy.prop === (key as keyof T) && (
										<>
											{sortBy.order === 'ASC' ? <FaSortAmountUp /> : <FaSortAmountDown />}
											&nbsp; &nbsp;
										</>
									)}
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent align="center">
								<h4 className="capitalize font-semibold text-sm py-1">Order</h4>
								<hr />
								<div
									className="w-full text-left p-2 flex flex-row items-center hover:bg-secondary/90"
									onSelect={() => setSortBy({ prop: key as keyof T, order: 'ASC' })}>
									<FaSortAmountUp /> &nbsp; Increasing
								</div>
								<div
									className="w-full text-left p-2 flex flex-row items-center hover:bg-secondary/90"
									onSelect={() => setSortBy({ prop: key as keyof T, order: 'DESC' })}>
									<FaSortAmountDown /> &nbsp; Decreasing
								</div>
								<hr />
								<h4 className="capitalize font-semibold text-sm pt-3 pb-1">Filter</h4>
								<hr />
								<div className="w-full text-left p-2">{!!value ? value : 'Missing filter'}</div>
							</PopoverContent>
						</Popover>
					</div>
				))}
			</div>
		);
	}, [setSortBy, sortBy, filterElements]);

	return setDefaultHeader();
}
