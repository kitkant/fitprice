'use client'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Banner from './components/Banner/Banner'
import Card from './components/Card/Card'
import { cardData } from './data/cardData'
import { useSharedTimer } from './layout'
import gerDataTariffs from './service/getPrice'
import { IReq, Tariffs } from './type/Tariffs'
import Alert from './UI/Alert'

const montserrat = Montserrat({
	subsets: ['latin'],
})

export default function Home() {
	const [data, setData] = useState<Tariffs[] | null>(null)
	const [req, setReq] = useState<IReq>({
		id: '',
		price: 0,
		check: false,
	})

	const { isExpired } = useSharedTimer()

	const [customErrors, setCustomErrors] = useState<Record<string, string>>({})
	const [showErrors, setShowErrors] = useState(false)

	const validate = (req: IReq) => {
		const errors: Record<string, string> = {}
		if (!req.check) errors.checked = 'Необходимо принять правило политики'
		setCustomErrors(errors)
		return Object.keys(errors).length === 0
	}

	const onSubmit = () => {
		setShowErrors(true)
		const isValid = validate(req)

		if (isValid) {
			alert(req.price)
			setShowErrors(false)
		}
	}

	useEffect(() => {
		gerDataTariffs()
			.then(res => {
				if (!res?.data?.length) return

				const tariffs = res.data
				setData(tariffs)

				if (tariffs.length > 3) {
					setReq({
						id: tariffs[3].id,
						price: tariffs[3].price,
						check: false,
					})
				}
			})
			.catch(error => {
				console.error('Tariff request failed:', error.message)
				setData(cardData)
			})
	}, [])

	useEffect(() => {
		if (isExpired && data) {
			const foundItem = data.find(item => item.price === req.price)
			if (foundItem) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setReq(prev => ({
					...prev,
					price: foundItem.full_price,
				}))
			}
		} else if (isExpired && cardData) {
			const foundItem = cardData.find(item => item.price === req.price)
			if (foundItem) {
				setReq(prev => ({
					...prev,
					price: foundItem.full_price,
				}))
			}
		}
	}, [isExpired, data, req.price])

	return (
		<div
			className={
				`flex h-full items-center bg-[#232829] font-[Montserrat] flex-col pb-37.5
				 max-md:pb-[100]
				 max-2xs:pb-[30]
				 max-3xs:pb-[20]
				` +
				' ' +
				montserrat.className
			}
		>
			<Banner />
			<div
				className='flex flex-col w-full mt-25.75 max-w-[1216]
				max-xl:max-w-[980]
				max-lg:max-w-[748]
				max-md:max-w-[600]
				max-sm:max-w-[460]
				max-xs:mt-[85]
				max-xs:max-w-full
				max-xs:pl-[16]
				max-xs:pr-[16]
				max-3xs:mt-[75]
			'
			>
				<h1
					className='text-white font-bold text-[40px] leading-[110%] tracking-[1%] pt-12.5
					max-lg:text-[36px]
					max-md:text-[34px]
					max-sm:text-[30px]
					max-2xs:text-[24px] max-2xs:max-w-[312]
					max-3xs:pt-[20] max-3xs:text-[22px]
				'
				>
					Выбери подходящий для себя{' '}
					<span className='text-[#FDB056]'>тариф</span>
				</h1>
				<div
					className='mt-27.5 flex justify-between
					max-lg:flex-col
					max-lg:items-center
					max-lg:mt-[40]
					max-xs:mt-[20]
				'
				>
					<Image
						className='mt-13 max-h-191.75
						max-lg:max-h-[520]
						max-lg:max-w-[260]
						max-lg:mt-0
						
						max-sm:max-h-[370]
						max-sm:max-w-[200]

						max-2xs:max-h-[250]
						max-2xs:max-w-[120]

						max-3xs:max-h-[200]
						max-3xs:max-w-[100]
						'
						alt='man'
						src='/mandesk.png'
						width={380}
						height={767}
					/>
					<div
						className='flex flex-col
						max-xl:w-129
						max-lg:w-full
						'
					>
						<div
							className='grid grid-cols-3 grid-rows-[190px_335px]  gap-4 max-w-187 w-full
							max-xl:grid-cols-[250px_250px]
							max-xl:grid-rows-[335px_335px]
							
							max-lg:grid-rows-[190px_335px]
							max-lg:grid-cols-3
							
							max-md:grid-cols-[290px_290px]
							max-md:grid-rows-[335px_335px]
							max-md:gap-5

							max-sm:grid-cols-[100%]
							max-sm:grid-rows-[205px_205px_205px_205px]

							max-xs:grid-rows-[150px_150px_150px_150px]

							max-2xs:grid-rows-[131px_131px_131px_131px]
							max-2xs:gap-[8]

							max-3xs:grid-rows-[118px_118px_118px_118px]
							max-3xs:gap-[6]
						'
						>
							{data && data.length > 0
								? [...data].reverse().map((card, index) => {
										return (
											<Card
												key={index}
												id={card.id}
												period={card.period}
												price={card.price}
												full_price={card.full_price}
												is_best={card.is_best}
												text={card.text}
												setReq={setReq}
												req={req}
												check={req.check}
											/>
										)
									})
								: // api перестало работать. Поэтому мок данные
									[...cardData].reverse().map((card, index) => {
										return (
											<Card
												key={index}
												id={card.id}
												period={card.period}
												price={card.price}
												full_price={card.full_price}
												is_best={card.is_best}
												text={card.text}
												setReq={setReq}
												req={req}
												check={req.check}
												notGet={false}
											/>
										)
									})}
						</div>
						<div className='w-full max-w-124.75 rounded-[20px] bg-[#2D3233] pt-4.5 pb-4.5 pr-5 pl-5 flex gap-1.5 items-start mt-5
							max-3xs:pt-[14] max-3xs:pb-[14] max-3xs:pl-[14]
						'
						>
							<div className='w-6 h-6.5'>
								<Alert />
							</div>
							<p
								className='leading-[130%] text-white
							 max-2xs:text-[12px]
							
							'
							>
								Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
								результат, чем за 1 месяц
							</p>
						</div>
						<div className='pt-8'>
							<label
								onClick={() => {
									setCustomErrors({})
									setShowErrors(false)
								}}
								className='flex items-center gap-3 cursor-pointer text-[#CDCDCD] leading-[110%] max-w-157.5 font-normal max-3xs:items-start'
							>
								<input
									type='checkbox'
									name='policy'
									onChange={e => setReq({ ...req, check: e.target.checked })}
									className={ 
										(showErrors
											? `appearance-none min-w-8 min-h-8 w-8 h-8 border border-[#FF0000] rounded-[5px] 
									cursor-pointer
									checked:bg-[url("/Vector.svg")] bg-no-repeat bg-center
									hover:border-[#FF0000]`
											: `appearance-none min-w-8 min-h-8 w-8 h-8 border border-[#606566] rounded-[5px] 
									cursor-pointer
									checked:bg-[url("/Vector.svg")] bg-no-repeat bg-center
									hover:border-[#424748]`)
									}
								/>{' '}
								<span className=' max-2xs:text-[12px]'>
									Я согласен с{' '}
									<span className='underline cursor-pointer'>
										офертой рекуррентных платежей
									</span>{' '}
									и{' '}
									<span className='underline cursor-pointer'>
										Политикой конфиденциальности
									</span>
								</span>
							</label>
							{showErrors ? (
								<div className='text-[#FF0000] pt-0.5'>
									{customErrors.checked}
								</div>
							) : (
								<></>
							)}
						</div>
						<div className='pt-4 '>
							<button
								onClick={onSubmit}
								className='animate-blink pt-5 pb-5 pl-34.25 pr-34.25 bg-[#FDB056] rounded-[20px] font-bold leading-[130%] text-[20px] cursor-pointer hover:opacity-[0.9]
								max-2xs:text-[18px] max-2xs:w-full
								max-3xs:pl-[60]
								max-3xs:pr-[60] 
								max-3xs:pt-[16] 
								max-3xs:pb-[16] 
								'
							>
								Купить
							</button>
						</div>
						<div className='pt-3.5 leading-[120%] text-[14px] text-[#9B9B9B] max-w-187 max-2xs:text-[10px]'>
							Нажимая кнопку «Купить», Пользователь соглашается на разовое
							списание денежных средств для получения пожизненного доступа к
							приложению. Пользователь соглашается, что данные
							кредитной/дебетовой карты будут сохранены для осуществления
							покупок дополнительных услуг сервиса в случае желания
							пользователя.
						</div>
					</div>
				</div>
			</div>
			<div
				className='flex flex-col max-w-[1216] gap-7.5 w-full mt-16.5 rounded-[20px] border border-[#484D4E] p-5
				max-xl:max-w-[980]
				max-lg:max-w-[748]
				max-md:max-w-[600]
				max-sm:max-w-[460]
				max-xs:max-w-[calc(100%-32px)]
				max-2xs:mt-[24]
				max-3xs:mt-[20]
				max-xs:p-[12]
			'
			>
				<div
					className='pt-4 pr-7.5 pl-7.5 pb-4.5 rounded-[30px] border border-[#81FE95] text-[#81FE95] text-[28px] leading-[120%] w-fit
					max-md:text-[24px]
					max-sm:text-[20px]
					max-xs:text-[18px]
					max-2xs:pt-[10] max-2xs:pr-[18] max-2xs:pl-[18] max-2xs:pb-[12]
					max-3xs:text-[16px]
					max-3xs:pl-[16]
					max-3xs:pr-[16]
				'
				>
					гарантия возврата 30 дней
				</div>
				<p
					className='text-[24px] text-[#DCDCDC] leading-[130%]
					max-md:text-[20px]
					max-sm:text-[18px]
					max-xs:text-[16px]
					max-2xs:text-[14px]
					max-3xs:text-[13px]

				'
				>
					Мы уверены, что наш план сработает для тебя и ты увидишь видимые
					результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
					деньги в течение 30 дней с момента покупки, если ты не получишь
					видимых результатов.
				</p>
			</div>
		</div>
	)
}
