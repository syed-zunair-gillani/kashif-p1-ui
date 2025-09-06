'use client'
import {addDays, format} from "date-fns";
import {memo, useState} from "react";
import * as React from "react";
import {cn} from "@/lib/utils";
import DistanceSelector from "@/components/services/services-search-results/distance-selector";
import SortbySelector from "@/components/services/services-search-results/sortby-selector";

function SearchResultCard() {
	const times = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
		"12:00 PM", "12:30 PM", "13:00 PM", "13:30 PM", "14:00 PM", "14:30 PM"]
	return (
			<div className={'w-full bg-white p-6 rounded-3xl flex flex-col sm:flex-row gap-6'}>

				{/*Service Basic info*/}
				<div className={'basis-[35%] py-4 px-6 flex gap-4'}>
					<img src={`/assets/icons/services/ServiceLogo.svg`} className={'rounded-full size-14'}/>
					<div className={'flex flex-col gap-0.5'}>
						<h5 className={'text-charcoal text-base font-semibold'}>Performance Center</h5>
						<div className={'flex items-center gap-1'}>
							<img src={`/assets/icons/services/YellowStarIcon.svg`} width={24}/>
							<h6 className={'text-charcoal text-sm font-semibold'}>4.5</h6>
						</div>
						<p className={'text-charcoal/50 text-sm'}>4.5 km away</p>
					</div>
				</div>


			{/*	Available reservation times*/}
				<div className={'basis-[65%] flex flex-col gap-3'}>
					<h5 className={'text-dark-gray text-sm font-medium'}>Available reservation time</h5>
					<div className={'flex gap-1 flex-wrap '}>
						{times.map((time) => {
							return (
									<div key={time} className={'flex max-w-[96px] justify-center items-center cursor-pointer bg-white rounded-[8px] border-[1px] border-soft-gray p-2 text-sm font-medium text-slate-gray'}>
										{time}
									</div>
							)
						})}
					</div>
				</div>
			</div>
	)
}

function ServicesSearchResults() {
	const cards_length = 4;
	const today = new Date();
	const next7Days = Array.from({ length: 7 }, (_, i) => format(addDays(today, i), 'dd MMM'));
	const [selectedDay,setSelectedDay] = useState<string>(next7Days[0]);
	return (
			<div className={'flex flex-col gap-y-5'}>
				<h5 className={'text-dark-gray text-sm font-medium'}>Search results</h5>

				{/*Filters*/}
				<div className={'w-full flex flex-col 1100:flex-row gap-y-5 1100:items-center justify-between'}>
					<div className={'flex basis-[65%] flex-col gap-y-3'}>
						<h5 className={'text-dark-gray text-sm font-medium'}>Reservation Date</h5>
						<div className={'w-full grid grid-cols-3 450:grid-cols-5 570:grid-cols-7 gap-2 pr-4'}>
							{next7Days.map((day) => {
								return (
										<div onClick={() => setSelectedDay(day)} key={day} className={cn('flex justify-center items-center cursor-pointer bg-white rounded-[8px] border-[1px] border-soft-gray p-2 text-sm font-medium text-slate-gray', day === selectedDay && 'text-steel-blue border-steel-blue bg-steel-blue/10 font-semibold')}>
											{day}
										</div>
								)
							})}
						</div>
					</div>

					<div className={'grid basis-[25%] grid-cols-2 gap-5'}>
						<div className={'flex flex-col gap-y-3'}>
							<label className={'text-sm font-medium text-dark-gray'}>Distance</label>
							<DistanceSelector />
						</div>
						<div className={'flex flex-col gap-y-3'}>
							<label className={'text-sm font-medium text-dark-gray'}>Sort by</label>
							<SortbySelector />
						</div>
					</div>
				</div>


				{/*Search result cards*/}
				<div className={'w-full flex flex-col gap-y-2'}>
					{Array.from({length: cards_length}).map((c, index) => {
						return (
								<SearchResultCard key={index}/>
						)
					})}
				</div>
			</div>
	)
}
export default memo(ServicesSearchResults)
