'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';

export interface ValidatorListOrder<T> {
	prop: keyof T;
	order: 'ASC' | 'DESC';
}

export default function ValidatorListHeader<T>({
	sortBy,
	setSortBy,
	filterValues,
	filterElements,
}: {
	sortBy: { prop: keyof T; order: 'ASC' | 'DESC' };
	setSortBy: (sortBy: ValidatorListOrder<T>) => void;
	filterValues: Record<keyof T, any>;
	filterElements: Record<keyof T, JSX.Element | null>;
}) {
	const setDefaultHeader = useCallback((): ReactNode => {
		return (
			<div
				className="grid rounded-t-3xl overflow-hidden border"
				style={{
					gridTemplateColumns: `repeat(${Object.keys(filterElements).length}, minmax(0, 1fr))`,
				}}>
				{Object.entries<JSX.Element | null>(filterElements).map(([key, value]) => (
					<div key={key} className="w-full">
						<Popover>
							<PopoverTrigger asChild className="w-full h-full">
								<div>
									<Button
										variant="default"
										className="px-1 py-2 hover:bg-accent font-bold text-lg rounded-none w-full h-full focus-visible:ring-0">
										<div className="block w-full">
											<div className="inline-block w-full self-center">
												<small className="text-md font-light w-min">
													{filterValues[key as keyof T]}
												</small>
											</div>
											<div className="w-full h-full flex flex-row items-center justify-center">
												{sortBy.prop === (key as keyof T) && (
													<>
														{sortBy.order === 'ASC' ? <FaSortAmountUp /> : <FaSortAmountDown />}
														&nbsp; &nbsp;
													</>
												)}
												<span>{key}</span> &nbsp;&nbsp;
												<span className="sr-only">Open menu</span>
											</div>
										</div>
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent align="center" className="rounded-xl border p-0">
								<h4 className="capitalize font-semibold text-sm py-1 m-2">Order</h4>
								<hr />
								<PopoverClose asChild>
									<div
										className="w-full py-2 hover:bg-accent cursor-pointer"
										onClick={(e) => {
											document.body.click();
											setSortBy({ prop: key as keyof T, order: 'ASC' });
										}}>
										<div className="w-full text-left px-3 flex flex-row items-center ">
											<FaSortAmountUp /> &nbsp; Increasing
										</div>
									</div>
								</PopoverClose>
								<PopoverClose asChild>
									<div
										className="w-full py-2 hover:bg-accent cursor-pointer"
										onClick={() => setSortBy({ prop: key as keyof T, order: 'DESC' })}>
										<div className="w-full text-left px-3 flex flex-row items-center ">
											<FaSortAmountDown /> &nbsp; Decreasing
										</div>
									</div>
								</PopoverClose>
								<hr />
								<h4 className="capitalize font-semibold text-sm pt-3 pb-1 mx-2">Filter</h4>
								<hr />
								<div className="w-full text-left p-3">{!!value ? value : 'Missing filter'}</div>
							</PopoverContent>
						</Popover>
					</div>
				))}
			</div>
		);
	}, [filterElements, filterValues, sortBy, setSortBy]);

	return setDefaultHeader();
}