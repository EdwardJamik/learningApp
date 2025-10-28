'use client'

import { useEffect, useState } from 'react'
import './special.scss'
import Loader from '@/app/components/Loader/Loader'
import Link from 'next/link'
import {useTranslation} from '@/context/TranslationProvider'

export default function SpecialLesson() {
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const coursesPerPage = 9
	const { locale } = useTranslation();
	
	useEffect(() => {
		async function fetchCourses() {
			try {
				const res = await fetch('/api/courses')
				const data = await res.json()
				
				const coursesWithStatus = data.courses.map((course, idx) => ({
					...course,
					status: 'available',
					id: course?.id
					// status: idx % 3 === 0 ? 'available' : idx % 3 === 1 ? 'in-progress' : 'completed'
				}))
				
				setCourses(coursesWithStatus)
			} catch (error) {
				console.error('Помилка завантаження курсів:', error)
			} finally {
				setLoading(false)
			}
		}
		
		fetchCourses()
	}, [])
	
	// Розрахунок пагінації
	const totalPages = Math.ceil(courses.length / coursesPerPage)
	const indexOfLastCourse = currentPage * coursesPerPage
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
	const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)
	
	const handlePageChange = (page) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	
	const renderButton = (status, id) => {
		switch (status) {
			case 'completed':
				return <button className="btn btn-completed-green">Пройдено</button>
			case 'in-progress':
				return <button className="btn btn-completed-red">Пройти курс</button>
			default:
				return <Link href={`/${locale !== 'ru' ? `special/${id}` : `ru/special/${id}`}`} className="btn btn-outline">Пройти курс</Link>
		}
	}
	
	const renderPaginationButtons = () => {
		const buttons = []
		const maxVisible = 5
		
		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(
					<button
						key={i}
						className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
						onClick={() => handlePageChange(i)}
					>
						{i}
					</button>
				)
			}
		} else {
			buttons.push(
				<button
					key={1}
					className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
					onClick={() => handlePageChange(1)}
				>
					1
				</button>
			)
			
			if (currentPage > 3) {
				buttons.push(<span key="dots1" className="pagination-dots">...</span>)
			}
			
			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)
			
			for (let i = start; i <= end; i++) {
				buttons.push(
					<button
						key={i}
						className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
						onClick={() => handlePageChange(i)}
					>
						{i}
					</button>
				)
			}
			
			if (currentPage < totalPages - 2) {
				buttons.push(<span key="dots2" className="pagination-dots">...</span>)
			}
			
			buttons.push(
				<button
					key={totalPages}
					className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
					onClick={() => handlePageChange(totalPages)}
				>
					{totalPages}
				</button>
			)
		}
		
		return buttons
	}
	
	if (loading) {
		return (
			<section className="lessons">
				<h1 className="title">
					<div className="container">Спецкурси</div>
				</h1>
				<div className="container">
					<Loader/>
				</div>
			</section>
		)
	}
	
	return (
		<section className="lessons">
			<h1 className="title">
				<div className="container">Спецкурси</div>
			</h1>
			
			<div className="container">
				<div className="course-grid">
					{currentCourses.map((course, index) => (
						<div key={index} className="course-card">
							<span className="badge">Безкоштовно для тебе</span>
							<div className="card-header">
								<div className="right-side">
									<h2 className="course-title">{course.title}</h2>
								</div>
							</div>
							
							<p className="course-description">{course.description}</p>
							
							{renderButton(course.status || 'available', course?.id)}
						</div>
					))}
				</div>
				
				{totalPages > 1 && (
					<div className="pagination">
						<button
							className="pagination-btn pagination-arrow"
							onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
						>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M12.5 15L7.5 10L12.5 5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						
						{renderPaginationButtons()}
						
						<button
							className="pagination-btn pagination-arrow"
							onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
							disabled={currentPage === totalPages}
						>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M7.5 15L12.5 10L7.5 5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
