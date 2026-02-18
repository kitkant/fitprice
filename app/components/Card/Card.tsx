import { useSharedTimer } from '@/app/layout'
import { TariffsCard } from '@/app/type/Tariffs'

const Card = ({
	id,
	period,
	price,
	full_price,
	is_best,
	text,
	req,
	setReq,
	check,
}: TariffsCard) => {
	const { isExpired } = useSharedTimer()

	return (
		<div
			className={
				`w-full flex overflow-hidden  bg-[#313637] border border-[#919191] rounded-[34px] cursor-pointer gap-10 relative
					max-xl:gap-15
					max-sm:pt-[20] max-sm:pb-[20] max-sm:pl-[40] max-sm:pr-[22]
					max-sm:flex-row max-sm:gap-0 max-sm:justify-between
					max-2xs:pt-[20] max-2xs:pr-[16] max-2xs:pb-[20] max-2xs:pl-[30]
					max-3xs:pt-[20] max-3xs:pr-[16] max-3xs:pb-[20] max-3xs:pl-[20]
				` +
				' ' +
				(is_best
					? `pt-7.5 pr-20 pb-6.5 pl-4.75 justify-end  col-span-full max-h-47.5
						max-xl:pt-17.5 max-xl:pb-5.75 max-xl:pl-4.5 max-xl:pr-4.5 max-xl:flex-col max-xl:max-h-83.75 max-xl:col-span-1
						max-lg:col-span-full max-lg:pt-7.5 max-lg:pr-20 max-lg:pb-6.5 max-lg:pl-4.75 max-lg:justify-end  max-lg:max-h-47.5 max-lg:flex-row max-lg:gap-[40]
						max-md:pt-17.5 max-md:pb-5.75 max-md:pl-4.5 max-md:pr-4.5 max-md:flex-col max-md:max-h-83.75 max-md:col-span-1 max-md:gap-15
						max-sm:flex-row max-sm:gap-0 max-sm:justify-between
						
						`
					: 'pt-17.5 pb-5.75 pl-4.5 pr-4.5 flex-col max-h-83.75') +
				' ' +
				(req.price === price || req.price === full_price
					? 'border-[#FDB056]'
					: '')
			}
			onClick={() => {
				if (req.price !== price || req.price !== full_price) {
					if (isExpired) {
						setReq({ id, price: full_price, check })
					} else {
						setReq({ id, price, check })
					}
				}
			}}
		>
			<div
				className={
					`flex flex-col gap-4 justify-center max-h-24.25
						max-sm:gap-0 max-sm:justify-between max-sm:h-full max-sm:max-h-none max-sm:pb-[39]
						max-sm:items-start
						max-xs:gap-[16]
						max-2xs:gap-[6]
						max-3xs:gap-0
					` +
					' ' +
					(is_best ? 'max-xl:items-center' : 'items-center')
				}
			>
				<h3
					className='font-medium text-[26px] leading-[120%] text-white justify-center flex
					max-xs:text-[18px]
					max-3xs:text-[16px]
				'
				>
					{period}
				</h3>
				<span
					className={
						'relative font-semibold text-[50px] leading-[100%] w-fit' +
						' ' +
						(is_best ? 'text-[#FDB056]' : 'text-[#Fff]')
					}
				>
					{
						<span
							className={`block transform transition-all duration-500 ease-in-out max-xs:text-[34px] max-3xs:text-[30px]  ${
								isExpired
									? 'opacity-0 scale-95 -translate-x-[200px]'
									: 'opacity-100 scale-100 translate-x-0'
							}`}
						>
							{price} ₽
						</span>
					}
					<span
						className={`flex transition-all duration-1000 ease-in-out absolute font-normal text-[24px] leading-[120%] text-[#919191]  -bottom-9  right-0 w-fit
							max-2xs:text-[16px] max-2xs:-bottom-3.75	max-3xs:text-[14px] max-3xs:-bottom-[5px]
							 ${
								isExpired
									? 'w-full justify-center top-1/2 -translate-y-1/2 h-fit text-[50px] whitespace-nowrap max-xs:text-[34px] max-2xs:text-[34px] max-xs:justify-start  max-3xs:text-[30px]' +
										' ' +
										(is_best ? 'text-[#FDB056]' : 'text-[#Fff]')
									: 'line-through'
							}`}
					>
						{full_price} ₽
					</span>
				</span>
			</div>
			<div
				className={
					` flex 
					max-xl:h-full	max-xl:mt-0	max-xl:items-start
					max-lg:items-center
					max-md:items-start
					max-sm:items-center
					` +
					' ' +
					(is_best ? 'h-full items-center' : 'mt-10')
				}
			>
				<p
					className={
						`
					text-white leading-[130%] 
					max-sm:max-w-[150]
					xl:max-w-[330]
					max-lg:max-w-[330]
					max-2xs:max-w-[130]
					max-3xs:max-w-[120]
					max-3xs:text-[14px]
					` +
						' ' +
						(is_best ? 'max-sm:hidden' : '')
					}
				>
					{text}
				</p>
				<p
					className={
						`sm:hidden text-white leading-[130%]
						max-sm:max-w-[150]
						max-2xs:max-w-[130]
						max-3xs:max-w-[120]
						max-3xs:text-[14px]
					` +
						' ' +
						(is_best ? '' : ' hidden')
					}
				>
					Всегда быть в форме{' '}
				</p>
			</div>
			{is_best ? (
				<div className='absolute top-2.5 right-5'>
					<p
						className='text-[#FDB056] leading-[110%] font-bold text-[22px] tracking-[0.03em]
						max-2xs:font-medium max-2xs:text-[16px]
						max-3xs:text-[13px]
					'
					>
						хит!
					</p>
				</div>
			) : (
				<></>
			)}
			{!isExpired ? (
				<div
					className={
						`absolute top-0 left-12.75 pt-1.25 pb-1.25 pl-2 pr-2 rounded-b-lg bg-[#FD5656]
						max-xs:pt-[3] 	max-xs:pb-[3] 	max-xs:pl-[6] 	max-xs:pr-[6] max-3xs:w-[43] max-3xs:h-[23]
						max-3xs:flex  max-3xs:justify-center max-3xs:items-center
			
						` +
						' ' +
						(is_best
							? '	max-sm:right-[84] max-sm:left-auto  max-3xs:right-[54]'
							: '	max-sm:right-[30] max-sm:left-auto max-3xs:right-[27]')
					}
				>
					<span className='text-white text-[22px] leading-[130%]
					max-xs:text-[16px] 			max-3xs:text-[13px]'>
						-{100 - Math.round((price * 100) / full_price)}%
					</span>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default Card
