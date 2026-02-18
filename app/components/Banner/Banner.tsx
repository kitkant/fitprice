import { useSharedTimer } from '@/app/layout'
import { UseTimerReturn } from '@/app/type/Tariffs'
import Star from '@/app/UI/Star'

const Banner = () => {
	const { timeLeft, isLast30Sec, isExpired }: UseTimerReturn = useSharedTimer()

	const minutes = String(Math.floor(timeLeft / 1000 / 60)).padStart(2, '0')
	const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

	return (
		<div
			className='w-full fixed top-0 bg-[#1D5B43] pb-[16] flex flex-col items-center gap-[4] z-2 pt-[8]
			max-xs:pb-[10]
			max-3xs:pb-[8]
		'
		>
			<h2
				className='text-white font-semibold text-2xl leading-[130%]
				max-xs:text-[18px]
				max-3xs:text-[14px]
			'
			>
				Успейте открыть пробную неделю
			</h2>
			<div className='flex gap-[10] items-center'>
				<Star isLast30Sec={isLast30Sec} isExpired={isExpired}/>
				<span
					className={
						isExpired
							? 'text-white font-bold text-[40px] leading-[130%] flex gap-1.25 max-xs:text-[34px] max-2xs:text-[32px] max-3xs:text-[28px]'
							: isLast30Sec
								? 'text-[#a41515] font-bold text-[40px] leading-[130%] flex gap-1.25 animate-blinkTimer max-xs:text-[34px]'
								: 'text-[#FFBB00] font-bold text-[40px] leading-[130%] flex gap-1.25 max-xs:text-[34px]'
					}
				>
					<span>{minutes}</span>
					<span>:</span>
					<span>{seconds}</span>
				</span>
				<Star isLast30Sec={isLast30Sec} isExpired={isExpired} />
			</div>
		</div>
	)
}

export default Banner
