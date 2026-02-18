export type Tariffs = {
	id: string
	period: string
	price: number
	full_price: number
	is_best: boolean
	text: string
}

export type TariffsCard = Tariffs & {
	req: IReq
	setReq: React.Dispatch<React.SetStateAction<IReq>>
	check: boolean
	notGet?: boolean
}

export interface IReq {
	id: string
	price: number	
	check: boolean
}


export type UseTimerReturn = {
	timeLeft: number;      
	isExpired: boolean;
	isLast30Sec: boolean
};