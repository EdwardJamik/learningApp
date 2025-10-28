'use client';

import parse from 'html-react-parser';
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import './course.scss'
import Loader from '@/app/components/Loader/Loader'
import CustomSelect from '@/app/components/CustomSelect/CustomSelect'

const Page = () => {
	const params = useParams()
	const courseId = params.id
	
	const [course, setCourse] = useState(null)
	const [loading, setLoading] = useState(true)
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const [showResults, setShowResults] = useState(false)
	const [score, setScore] = useState(0)
	
	useEffect(() => {
		async function fetchCourse() {
			try {
				const res = await fetch('/api/courses')
				const data = await res.json()
				
				const foundCourse = data.courses.find(c => c.id === courseId)
				
				if (foundCourse) {
					setCourse(foundCourse)
					setSelectedAnswers(new Array(foundCourse.answer.length).fill(null))
				}
			} catch (error) {
				console.error('Помилка завантаження курсу:', error)
			} finally {
				setLoading(false)
			}
		}
		
		if (courseId) {
			fetchCourse()
		}
	}, [courseId])
	
	const getYouTubeEmbedUrl = (url) => {
		if (!url) return ''
		
		const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
		if (videoIdMatch) {
			return `https://www.youtube.com/embed/${videoIdMatch[1]}`
		}
		return url
	}
	
	const processTestText = (text) => {
		if (!text) return null
		
		const parts = text.split(/<span class='space'><\/span>/g)
		
		return parts.map((part, i) => {
			const select = course.answer[i]
			
			return (
				<p key={i} style={{ display: 'inline' }}>
        <span dangerouslySetInnerHTML={{ __html: part }} style={{ display: 'inline' }} />
					{i < parts.length - 1 && select && (
						<>
							{' '}
							<CustomSelect
								options={select}
								value={selectedAnswers[i]}
								onChange={(val) => {
									const newAnswers = [...selectedAnswers]
									newAnswers[i] = val
									setSelectedAnswers(newAnswers)
								}}
								disabled={showResults}
							/>
							{' '}
						</>
					)}
        </p>
			)
		})
	}
	
	
	const handleAnswerChange = (e) => {
		const index = parseInt(e.target.dataset.index)
		const value = e.target.value === '' ? null : parseInt(e.target.value)
		
		const newAnswers = [...selectedAnswers]
		newAnswers[index] = value
		setSelectedAnswers(newAnswers)
	}
	
	const handleCheck = () => {
		if (selectedAnswers.some(answer => answer === null)) {
			alert('Будь ласка, дайте відповідь на всі питання')
			return
		}
		
		let correctCount = 0
		selectedAnswers.forEach((answer, index) => {
			if (answer === course.correct_answer[index]) {
				correctCount++
			}
		})
		
		setScore(correctCount)
		setShowResults(true)
	}
	
	const handleReset = () => {
		setSelectedAnswers(new Array(course.answer.length).fill(null))
		setShowResults(false)
		setScore(0)
	}
	
	useEffect(() => {
		if (course && !showResults) {
			const selects = document.querySelectorAll('.answer-select')
			selects.forEach(select => {
				select.addEventListener('change', handleAnswerChange)
			})
			
			return () => {
				selects.forEach(select => {
					select.removeEventListener('change', handleAnswerChange)
				})
			}
		}
	}, [course, selectedAnswers, showResults])
	
	if (loading) {
		return (
			<section className="special-course">
				<h1 className="title">
					<div className="container">Спецкурси</div>
				</h1>
				<div className="container">
					<Loader />
				</div>
			</section>
		)
	}
	
	if (!course) {
		return (
			<section className="special-course">
				<h1 className="title">
					<div className="container">Спецкурси</div>
				</h1>
				<div className="container">
					<p>Курс не знайдено</p>
				</div>
			</section>
		)
	}
	
	return (
		<section className="special-course">
			<h1 className="title">
				<div className="container">{course.title}</div>
			</h1>
			
			<div className="container">
				
				<div className="video">
					<iframe
						width="100%"
						height="100%"
						src={getYouTubeEmbedUrl(course.youtube_video_link)}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				</div>
				
				<div className="test-content">
					<div className="questionText">
						{processTestText(course.test)}
					</div>
				</div>
				
				{showResults && (
					<div className="results">
						<p className="results-text">
							Правильних відповідей: {score} з {course.correct_answer.length}
						</p>
					</div>
				)}
				
				<div className="button-group">
						<button className="btn btn-primary" onClick={handleCheck}>
							Перевірити
						</button>
			
				</div>
			</div>
		</section>
	)
}

export default Page