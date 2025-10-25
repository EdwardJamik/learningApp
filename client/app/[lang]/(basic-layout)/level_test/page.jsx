"use client"

import {useEffect, useState} from 'react'
import "./level_test.scss"
import TestResultModal from '@/app/components/Modal/TestResultModal'
import {useAuth} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'

export default function EnglishLevelTest() {
	const [answers, setAnswers] = useState({})
	const [currentPage, setCurrentPage] = useState(0)
	const [showPageResults, setShowPageResults] = useState(false)
	const [showFinalResults, setShowFinalResults] = useState(false)
	const [userLevel, setUserLevel] = useState(null)
	const [isQuestion, setQuestion] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [hoveredAnswer, setHoveredAnswer] = useState({})
	const { checkAuth } = useAuth()
	const router = useRouter()
	
	const levelRanges = [
		{ max: 8, level: "A1", rangeStart: 0, rangeEnd: 8 },
		{ max: 17, level: "A2", rangeStart: 8, rangeEnd: 17 },
		{ max: 22, level: "A2+", rangeStart: 17, rangeEnd: 22 },
		{ max: 30, level: "B1", rangeStart: 22, rangeEnd: 30 },
		{ max: 40, level: "B1+", rangeStart: 30, rangeEnd: 40 },
		{ max: 48, level: "B2", rangeStart: 40, rangeEnd: 48 },
		{ max: 55, level: "B2+", rangeStart: 48, rangeEnd: 55 },
		{ max: 60, level: "C1", rangeStart: 55, rangeEnd: 60 }
	]
	
	useEffect(() => {
		async function fetchLevels() {
			try {
				const response = await fetch('/api/level_test')
				if (!response.ok) throw new Error('Помилка завантаження даних')
				const data = await response.json()
				setQuestion(data.questions || [])
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchLevels()
	}, [])
	
	if (loading) {
		return (
			<section className='english_test'>
				<div className="container">
					<h1 className="title">English Level Test</h1>
					<p>Завантаження...</p>
				</div>
			</section>
		)
	}
	
	const groupQuestionsByType = () => {
		const pages = []
		const questionsByType = {
			0: isQuestion.filter(q => q.type === 0),
			1: isQuestion.filter(q => q.type === 1),
			2: isQuestion.filter(q => q.type === 2)
		}
		
		// Type 0: по 9 на сторінку
		for (let i = 0; i < questionsByType[0].length; i += 9) {
			pages.push({
				type: 0,
				questions: questionsByType[0].slice(i, i + 9)
			})
		}
		
		// Type 1: по 3 на сторінку
		for (let i = 0; i < questionsByType[1].length; i += 3) {
			pages.push({
				type: 1,
				questions: questionsByType[1].slice(i, i + 3)
			})
		}
		
		// Type 2: по 5 на сторінку
		for (let i = 0; i < questionsByType[2].length; i += 5) {
			pages.push({
				type: 2,
				questions: questionsByType[2].slice(i, i + 5)
			})
		}
		
		return pages
	}
	
	const pages = groupQuestionsByType()
	const currentPageData = pages[currentPage] || { type: 0, questions: [] }
	const currentQuestions = currentPageData.questions
	const currentType = currentPageData.type
	
	// Визначаємо загальний номер питання
	const getQuestionNumber = (question) => {
		return isQuestion.findIndex(q => q.id === question.id) + 1
	}
	
	// Визначаємо діапазон питань для наступної сторінки
	const getNextPageRange = () => {
		if (currentPage >= pages.length - 1) return null
		const nextPage = pages[currentPage + 1]
		const firstQuestion = getQuestionNumber(nextPage.questions[0])
		const lastQuestion = getQuestionNumber(nextPage.questions[nextPage.questions.length - 1])
		return { first: firstQuestion, last: lastQuestion }
	}
	
	const handleAnswerSelect = (questionId, answerIndex) => {
		if (showPageResults) return
		
		setAnswers((prev) => ({
			...prev,
			[questionId]: answerIndex,
		}))
	}
	
	const checkAllQuestionsAnswered = () => {
		return currentQuestions.every(question => answers[question.id] !== undefined)
	}
	
	const calculatePageScore = () => {
		let correct = 0
		currentQuestions.forEach((question) => {
			if (answers[question.id] === question.correct_answer) {
				correct++
			}
		})
		return correct
	}
	
	const isAnswerCorrect = (questionId) => {
		const question = currentQuestions.find(q => q.id === questionId)
		return answers[question.id] === question.correct_answer
	}
	
	// Отримати поточний рівень на основі кількості відповідей
	const getCurrentLevelByAnsweredCount = (totalAnswered) => {
		// Якщо відповіли N разів, значить працюємо з питаннями 0..N-1
		// Треба знайти рівень, в якому знаходиться останнє відповіджене питання
		for (let i = 0; i < levelRanges.length; i++) {
			// Якщо totalAnswered входить в діапазон рівня [rangeStart+1, rangeEnd]
			if (totalAnswered > levelRanges[i].rangeStart && totalAnswered <= levelRanges[i].rangeEnd) {
				return levelRanges[i]
			}
		}
		return levelRanges[levelRanges.length - 1]
	}
	
	// Підрахунок правильних відповідей в межах конкретного рівня
	const getCorrectAnswersInLevel = (level) => {
		let correctCount = 0
		let answeredCount = 0
		
		for (let i = level.rangeStart; i < level.rangeEnd && i < isQuestion.length; i++) {
			const question = isQuestion[i]
			if (answers[question.id] !== undefined) {
				answeredCount++
				if (answers[question.id] === question.correct_answer) {
					correctCount++
				}
			}
		}
		
		return { correctCount, answeredCount }
	}
	
	// Перевірка чи користувач пройшов рівень (80% правильних відповідей)
	const checkLevelCompletion = () => {
		let totalAnswered = Object.keys(answers).length
		let currentLevelIndex = -1
		let lastCompletedLevelIndex = -1
		
		// Знаходимо останній завершений рівень та поточний незавершений
		for (let i = 0; i < levelRanges.length; i++) {
			const level = levelRanges[i]
			const { correctCount, answeredCount } = getCorrectAnswersInLevel(level)
			const questionsInLevel = level.rangeEnd - level.rangeStart
			
			console.log(`Перевірка рівня ${level.level}: ${answeredCount}/${questionsInLevel} відповідей`)
			
			// Якщо є відповіді в рівні
			if (answeredCount > 0) {
				if (answeredCount === questionsInLevel) {
					// Рівень завершено повністю
					lastCompletedLevelIndex = i
					console.log(`  → Рівень ${level.level} завершено`)
				} else {
					// Рівень не завершено - це поточний рівень
					currentLevelIndex = i
					console.log(`  → Рівень ${level.level} в процесі`)
					break
				}
			}
		}
		
		// Якщо є незавершений рівень - аналізуємо його
		// Якщо всі рівні завершені - аналізуємо останній завершений
		const levelIndexToCheck = currentLevelIndex >= 0 ? currentLevelIndex : lastCompletedLevelIndex
		
		if (levelIndexToCheck < 0) {
			// Немає жодних відповідей - повертаємо перший рівень
			levelIndexToCheck = 0
		}
		
		const currentLevel = levelRanges[levelIndexToCheck]
		const questionsInLevel = currentLevel.rangeEnd - currentLevel.rangeStart
		const { correctCount, answeredCount } = getCorrectAnswersInLevel(currentLevel)
		const requiredCorrect = Math.ceil(questionsInLevel * 0.8) // 80% правильних
		const percentage = answeredCount > 0 ? (correctCount / questionsInLevel) * 100 : 0
		const passed = correctCount >= requiredCorrect
		
		console.log('=== Аналіз рівня ===')
		console.log('Індекс рівня:', levelIndexToCheck)
		console.log('Рівень:', currentLevel.level)
		console.log('Діапазон рівня:', currentLevel.rangeStart, '-', currentLevel.rangeEnd)
		console.log('Всього відповіли:', totalAnswered)
		console.log('Питань у рівні:', questionsInLevel)
		console.log('Відповідей у рівні:', answeredCount)
		console.log('Правильних у рівні:', correctCount)
		console.log('Потрібно для проходження:', requiredCorrect)
		console.log('Відсоток:', percentage.toFixed(1) + '%')
		console.log('Результат:', passed ? '✅ ПРОЙДЕНО' : '❌ НЕ ПРОЙДЕНО')
		
		return {
			passed,
			currentLevel,
			currentLevelIndex: levelIndexToCheck,
			correctCount,
			answeredCount,
			questionsInLevel,
			requiredCorrect,
			percentage,
			lastCompletedLevelIndex
		}
	}
	
	const handleNextPage = async () => {
		const isLastPage = currentPage >= pages.length - 1
		
		// Спочатку перевіряємо всі завершені рівні
		for (let i = 0; i < levelRanges.length; i++) {
			const level = levelRanges[i]
			const { correctCount, answeredCount } = getCorrectAnswersInLevel(level)
			const questionsInLevel = level.rangeEnd - level.rangeStart
			
			// Якщо рівень завершено - перевіряємо чи пройдено
			if (answeredCount === questionsInLevel) {
				const requiredCorrect = Math.ceil(questionsInLevel * 0.8)
				const passed = correctCount >= requiredCorrect
				
				console.log(`Перевірка завершеного рівня ${level.level}: ${correctCount}/${questionsInLevel} (потрібно ${requiredCorrect})`)
				
				if (!passed) {
					// Не пройшов цей рівень - визначаємо фінальний рівень
					const finalLevel = i > 0 ? levelRanges[i - 1].level : level.level
					const percentage = (correctCount / questionsInLevel) * 100
					
					console.log(`❌ Користувач не пройшов рівень ${level.level}, його рівень: ${finalLevel}`)
					
					// Завершуємо тест
					setUserLevel({
						level: finalLevel,
						score: correctCount,
						total: questionsInLevel,
						percentage: percentage
					})
					
					await handleSetLevel(finalLevel)
					return
				} else {
					console.log(`✅ Рівень ${level.level} пройдено`)
				}
			} else if (answeredCount > 0) {
				// Якщо рівень не завершено але є відповіді - продовжуємо тест
				console.log(`Рівень ${level.level} в процесі (${answeredCount}/${questionsInLevel}), продовжуємо`)
				setShowPageResults(false)
				setCurrentPage(currentPage + 1)
				window.scrollTo({ top: 0, behavior: 'smooth' })
				return
			}
		}
		
		// Якщо всі рівні пройдено - завершуємо з максимальним рівнем
		const lastLevel = levelRanges[levelRanges.length - 1]
		const { correctCount, answeredCount } = getCorrectAnswersInLevel(lastLevel)
		const percentage = (correctCount / (lastLevel.rangeEnd - lastLevel.rangeStart)) * 100
		
		console.log('Всі рівні пройдено! Фінальний рівень:', lastLevel.level)
		
		setUserLevel({
			level: lastLevel.level,
			score: correctCount,
			total: lastLevel.rangeEnd - lastLevel.rangeStart,
			percentage: percentage
		})
		
		await handleSetLevel(lastLevel.level)
	}
	
	const handleSetLevel = async (level) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/test-level`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					level: level,
				}),
			})
			
			await checkAuth()
			
			if (!response.ok) {
				throw new Error('Failed to submit test result')
			}
			
			const data = await response.json()
			setIsModalOpen(true)
			
		} catch (error) {
			console.error('Error submitting test:', error)
			alert('Помилка при збереженні результату тесту. Спробуйте ще раз.')
		}
	}
	
	// Функція для обробки тексту з .space
	const processQuestionText = (question, hovered = null) => {
		let text = question.question
		
		let spaceContent = ''
		let spaceClass = 'space'
		
		if (showPageResults) {
			const selectedAnswer = answers[question.id]
			const correctAnswer = question.correct_answer
			const isCorrect = selectedAnswer === correctAnswer
			
			if (isCorrect) {
				spaceContent = question.answer[selectedAnswer] || ''
				spaceClass = 'space correct'
			} else {
				const selectedText = question.answer[selectedAnswer] || ''
				const correctText = question.answer[correctAnswer] || ''
				return text.replace('<span class=\'space\'></span>', `<span class="space incorrect">${selectedText}</span><span class="space correct">${correctText}</span>`)
			}
		} else if (hovered !== null && hovered !== undefined) {
			spaceContent = question.answer[hovered] || ''
			spaceClass = 'space hovered'
		} else if (answers[question.id] !== undefined) {
			spaceContent = question.answer[answers[question.id]] || ''
			spaceClass = 'space selected'
		}
		
		const result = text.replace('<span class=\'space\'></span>', `<span class="${spaceClass}">${spaceContent}</span>`)
		return result
	}
	
	const renderQuestion = (question) => {
		const hovered = hoveredAnswer[question.id]
		
		switch (question.type) {
			case 0:
				const processedText = processQuestionText(question, hovered)
				return (
					<p className='questionText' dangerouslySetInnerHTML={{ __html: processedText }} />
				)
			
			case 1:
				return (
					<>
						<div className='questionDescription'>
							<p>{question.description}</p>
						</div>
						<p className='questionText' dangerouslySetInnerHTML={{ __html: processQuestionText(question, hovered) }} />
					</>
				)
			
			case 2:
				return (
					<>
						<div className='audioContainer'>
							<audio controls src={question.task}>
								Your browser does not support the audio element.
							</audio>
						</div>
						<p className='questionText' dangerouslySetInnerHTML={{ __html: processQuestionText(question, hovered) }} />
					</>
				)
			
			default:
				return null
		}
	}
	
	const handleRestartTest = () => {
		setShowFinalResults(false)
		setShowPageResults(false)
		setAnswers({})
		setUserLevel(null)
		setCurrentPage(0)
		setIsModalOpen(false)
	}
	
	const isLastPage = currentPage >= pages.length - 1
	const nextRange = getNextPageRange()
	
	// Рендер для type 0 (grid layout)
	const renderType0Questions = () => (
		<div className='questionsGrid'>
			{currentQuestions.map((question) => {
				const isCorrect = showPageResults ? isAnswerCorrect(question.id) : null
				
				return (
					<div key={question.id}
					     className={`questionCard ${showPageResults ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
						<div className='questionHeader'>
							<span className='questionNumber'>{getQuestionNumber(question)}</span>
							{showPageResults && (
								<span className='questionResult'>
									{isCorrect ?
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path d="M21.6663 6.5L9.74967 18.4167L4.33301 13" stroke="#00FF62" strokeWidth="2"
											      strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										:
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path d="M19.5 6.5L6.5 19.5M6.5 6.5L19.5 19.5" stroke="#FF2B00" strokeWidth="2"
											      strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									}
								</span>
							)}
							{renderQuestion(question)}
						</div>
						
						<div className="optionsContainer">
							{question.answer.map((option, optionIndex) => {
								const isSelected = answers[question.id] === optionIndex
								const isCorrectAnswer = optionIndex === question.correct_answer
								const isWrongAnswer = isSelected && !isCorrectAnswer
								
								let buttonClass = 'optionButton'
								if (isSelected) buttonClass += ' selected'
								
								if (showPageResults && isWrongAnswer) {
									buttonClass += ' wrongAnswer'
								}
								
								if (showPageResults && isCorrectAnswer) {
									if (isWrongAnswer)
										buttonClass += ' correctAnswerTo'
									else
										buttonClass += ' correctAnswer'
								}
								
								return (
									<button
										key={optionIndex}
										className={buttonClass}
										onClick={() => handleAnswerSelect(question.id, optionIndex)}
										onMouseEnter={() => {
											if (!showPageResults) {
												setHoveredAnswer(prev => ({...prev, [question.id]: optionIndex}))
											}
										}}
										onMouseLeave={() => {
											if (!showPageResults) {
												setHoveredAnswer(prev => {
													const newState = {...prev}
													delete newState[question.id]
													return newState
												})
											}
										}}
										disabled={showPageResults}
									>
										{option}
									</button>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
	
	// Рендер для type 1 та type 2 (vertical layout)
	const renderType12Questions = () => (
		<div className='questionsList'>
			{currentQuestions.map((question) => {
				const isCorrect = showPageResults ? isAnswerCorrect(question.id) : null
				
				return (
					<div key={question.id}
					     className={`questionItem ${showPageResults ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
						<div className='questionHeader'>
							<span className='questionNumber'>{getQuestionNumber(question)}</span>
							{showPageResults && (
								<span className='questionResult'>
									{isCorrect ?
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path d="M21.6663 6.5L9.74967 18.4167L4.33301 13" stroke="#00FF62" strokeWidth="2"
											      strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										:
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
											<path d="M19.5 6.5L6.5 19.5M6.5 6.5L19.5 19.5" stroke="#FF2B00" strokeWidth="2"
											      strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									}
								</span>
							)}
						</div>
						
						{renderQuestion(question)}
						
						<div className="optionsContainer">
							{question.answer.map((option, optionIndex) => {
								const isSelected = answers[question.id] === optionIndex
								const isCorrectAnswer = optionIndex === question.correct_answer
								const isWrongAnswer = isSelected && !isCorrectAnswer
								
								let buttonClass = 'optionButton'
								if (isSelected) buttonClass += ' selected'
								
								if (showPageResults && isWrongAnswer) {
									buttonClass += ' wrongAnswer'
								}
								
								if (showPageResults && isCorrectAnswer) {
									if (isWrongAnswer)
										buttonClass += ' correctAnswerTo'
									else
										buttonClass += ' correctAnswer'
								}
								
								return (
									<button
										key={optionIndex}
										className={buttonClass}
										onClick={() => handleAnswerSelect(question.id, optionIndex)}
										onMouseEnter={() => {
											if (!showPageResults) {
												setHoveredAnswer(prev => ({...prev, [question.id]: optionIndex}))
											}
										}}
										onMouseLeave={() => {
											if (!showPageResults) {
												setHoveredAnswer(prev => {
													const newState = {...prev}
													delete newState[question.id]
													return newState
												})
											}
										}}
										disabled={showPageResults}
									>
										{option}
									</button>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
	
	return (
		<>
			<section className='english_test'>
				<div className="container">
					<h1 className='title'>English Level Test</h1>
					
					{currentType === 0 ? renderType0Questions() : renderType12Questions()}
					
					<button
						className='submitButton'
						onClick={handleNextPage}
						disabled={!checkAllQuestionsAnswered()}
					>
						{isLastPage
							? 'Завершити тест'
							: nextRange ? `Перейти до завдань ${nextRange.first}-${nextRange.last}` : 'Далі'
						}
					</button>
				</div>
			</section>
			<TestResultModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					router.push('/dashboard')
				}}
				level={userLevel?.level}
			/>
		</>
	)
}