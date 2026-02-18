'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import React from 'react'
import './globals.css'
import { useTimer } from './hook/useTimer'
import { UseTimerReturn } from './type/Tariffs'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const TimerContext = React.createContext<UseTimerReturn>({
	timeLeft: 0,
	isExpired: false,
	isLast30Sec: false,
})

export function useSharedTimer() {
	return React.useContext(TimerContext)
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const timer = useTimer(120000)
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
			</body>
		</html>
	)
}
