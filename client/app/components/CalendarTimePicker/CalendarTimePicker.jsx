"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import styles from "./calendarTimePicker.module.scss"
import ModalSuccesCall from '@/app/components/Modal/ModalSuccesCall'

export default function CalendarTimePicker({ onConfirm }) {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedTime, setSelectedTime] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false);
	// Українські назви місяців
	const monthNames = [
		"січ.",
		"лют.",
		"бер.",
		"квіт.",
		"трав.",
		"черв.",
		"лип.",
		"серп.",
		"вер.",
		"жовт.",
		"лист.",
		"груд.",
	]
	
	// Українські назви днів тижня
	const weekDays = ["П", "В", "С", "Ч", "П", "С", "Н"]
	
	// Доступні часи
	const availableTimes = [
		"8:20",
		"8:40",
		"09:00",
		"09:20",
		"09:40",
		"10:00",
		"10:20",
		"10:40",
		"11:00",
		"11:20",
		"11:40",
		"12:00",
		"12:20",
		"12:40",
		"13:00",
		"13:20",
		"13:40",
		"14:00",
		"14:20",
		"14:40",
		"15:00",
		"15:20",
		"15:40",
		"16:00",
		"16:20",
		"16:40",
		"17:00",
		"17:20",
		"17:40",
		"18:00",
		"18:20",
		"18:40",
		"19:00",
		"19:20",
		"19:40",
		"20:00",
		"20:20",
		"20:40",
		"21:00",
		"21:20",
		"21:40",
		"22:00"
	]
	
	const changeModalView = (status) => {
		setIsModalOpen(status);
	};
	
	const getDaysInMonth = (date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)
		const daysInMonth = lastDay.getDate()
		
		// Отримати день тижня першого дня (0 = неділя, потрібно конвертувати в понеділок = 0)
		let firstDayOfWeek = firstDay.getDay()
		firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
		
		const days = []
		
		// Додати порожні клітинки для днів попереднього місяця
		for (let i = 0; i < firstDayOfWeek; i++) {
			days.push(null)
		}
		
		// Додати дні поточного місяця
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i)
		}
		
		return days
	}
	
	// Навігація між місяцями
	const goToPreviousMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
	}
	
	const goToNextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
	}
	
	// Вибір дати
	const handleDateSelect = (day) => {
		if (day && !isPastDate(day)) {
			const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
			setSelectedDate(selected)
			// Скинути вибраний час, якщо він став недоступним
			if (selectedTime && isPastTime(selectedTime)) {
				setSelectedTime(null)
			}
		}
	}
	
	// Вибір часу
	const handleTimeSelect = (time) => {
		if (!isPastTime(time)) {
			setSelectedTime(time)
		}
	}
	
	// Перевірка чи день є сьогодні
	const isToday = (day) => {
		const today = new Date()
		return (
			day === today.getDate() &&
			currentDate.getMonth() === today.getMonth() &&
			currentDate.getFullYear() === today.getFullYear()
		)
	}
	
	// Перевірка чи день вибраний
	const isSelected = (day) => {
		if (!selectedDate || !day) return false
		return (
			day === selectedDate.getDate() &&
			currentDate.getMonth() === selectedDate.getMonth() &&
			currentDate.getFullYear() === selectedDate.getFullYear()
		)
	}
	
	// Форматування дати для відображення
	const formatSelectedDate = () => {
		if (!selectedDate || !selectedTime) return ""
		const day = String(selectedDate.getDate()).padStart(2, "0")
		const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
		const year = selectedDate.getFullYear()
		return `${day}.${month}.${year} о ${selectedTime}`
	}
	
	// Підтвердження вибору
	const handleConfirm = () => {
		if (selectedDate && selectedTime && onConfirm) {
			setIsModalOpen(true)
		}
	}
	
	const isPastDate = (day) => {
		if (!day) return false
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
		checkDate.setHours(0, 0, 0, 0)
		return checkDate < today
	}
	
	const isPastTime = (time) => {
		if (!selectedDate) return false
		
		const today = new Date()
		const selectedDateOnly = new Date(selectedDate)
		selectedDateOnly.setHours(0, 0, 0, 0)
		const todayOnly = new Date(today)
		todayOnly.setHours(0, 0, 0, 0)
		
		// Якщо вибрана дата не сьогодні, то час не в минулому
		if (selectedDateOnly.getTime() !== todayOnly.getTime()) {
			return false
		}
		
		// Якщо вибрана дата сьогодні, перевіряємо час
		const [hours, minutes] = time.split(":").map(Number)
		const currentHours = today.getHours()
		const currentMinutes = today.getMinutes()
		
		if (hours < currentHours) return true
		if (hours === currentHours && minutes <= currentMinutes) return true
		
		return false
	}
	
	const days = getDaysInMonth(currentDate)
	
	return (
		<>
			<div className={styles.calendar}>
				{/* Заголовок календаря */}
				<div className={styles.header}>
					<button onClick={goToPreviousMonth} className={styles.navButton} aria-label="Попередній місяць">
						<ChevronLeft/>
					</button>
					
					<h2 className={styles.monthTitle}>
						{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}р.
					</h2>
					
					<button onClick={goToNextMonth} className={styles.navButton} aria-label="Наступний місяць">
						<ChevronRight/>
					</button>
				</div>
				
				{/* Дні тижня */}
				<div className={styles.weekDays}>
					{weekDays.map((day, index) => (
						<div key={index} className={styles.weekDay}>
							{day}
						</div>
					))}
				</div>
				
				{/* Календарна сітка */}
				<div className={styles.daysGrid}>
					{days.map((day, index) => {
						const dayClasses = [styles.dayButton]
						if (!day) dayClasses.push(styles.empty)
						if (isPastDate(day)) dayClasses.push(styles.past)
						if (isToday(day) && !isSelected(day) && !isPastDate(day)) dayClasses.push(styles.today)
						if (isSelected(day)) dayClasses.push(styles.selected)
						
						return (
							<button
								key={index}
								onClick={() => handleDateSelect(day)}
								disabled={!day || isPastDate(day)}
								className={dayClasses.join(" ")}
							>
								{day}
							</button>
						)
					})}
				</div>
				
				{/* Розділювач */}
				<div className={styles.divider}></div>
				
				{/* Вибір часу */}
				<div className={styles.timeSection}>
					<div className={styles.timeHeader}>
						<Clock/>
						<h3>Оберіть час</h3>
					</div>
					
					<div className={styles.timeGrid}>
						{availableTimes.map((time) => {
							const isDisabled = isPastTime(time)
							const timeClasses = [styles.timeButton]
							if (isDisabled) timeClasses.push(styles.disabled)
							if (selectedTime === time && !isDisabled) timeClasses.push(styles.selected)
							
							return (
								<button
									key={time}
									onClick={() => handleTimeSelect(time)}
									disabled={isDisabled}
									className={timeClasses.join(" ")}
								>
									{time}
								</button>
							)
						})}
					</div>
				</div>
				
				{/* Вибрана дата та час */}
				{selectedDate && selectedTime && <div className={styles.summary}>Обрано: {formatSelectedDate()}</div>}
				
				{/* Кнопка підтвердження */}
				<button
					onClick={handleConfirm}
					disabled={!selectedDate || !selectedTime}
					className={`${styles.confirmButton} ${selectedDate && selectedTime ? styles.active : styles.disabled}`}
				>
					Забронювати
				</button>
			</div>
			<ModalSuccesCall
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	)
}
