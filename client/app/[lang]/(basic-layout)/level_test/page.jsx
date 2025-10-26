"use client"

import {useEffect, useState} from 'react'
import "./level_test.scss"
import TestResultModal from '@/app/components/Modal/TestResultModal'
import {useAuth} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'
import Loader from '@/app/components/Loader/Loader'

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
		{ level: "A1",  rangeStart: 0,  rangeEnd: 9  },
		{ level: "A2",  rangeStart: 10, rangeEnd: 19 },
		{ level: "A2+", rangeStart: 20, rangeEnd: 29 },
		{ level: "B1",  rangeStart: 30, rangeEnd: 39 },
		{ level: "B1+", rangeStart: 40, rangeEnd: 49 },
		{ level: "B2",  rangeStart: 50, rangeEnd: 59 },
		{ level: "B2+", rangeStart: 60, rangeEnd: 69 },
		{ level: "C1",  rangeStart: 70, rangeEnd: 79 }
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
					<Loader/>
				</div>
			</section>
		)
	}
	
	const groupQuestionsByType = () => {
		const pages = []
		let i = 0
		
		while (i < isQuestion.length) {
			const currentQuestion = isQuestion[i]
			const currentType = currentQuestion.type
			
			// Визначаємо кількість питань на сторінку залежно від типу
			let questionsPerPage
			if (currentType === 0) {
				questionsPerPage = 9
			} else if (currentType === 1) {
				questionsPerPage = 3
			} else if (currentType === 2) {
				questionsPerPage = 1
			}
			
			// Збираємо питання одного типу для поточної сторінки
			const pageQuestions = []
			let count = 0
			
			while (i < isQuestion.length && count < questionsPerPage) {
				if (isQuestion[i].type === currentType) {
					pageQuestions.push(isQuestion[i])
					count++
					i++
				} else {
					// Якщо зустріли інший тип, виходимо з циклу
					break
				}
			}
			
			pages.push({
				type: currentType,
				questions: pageQuestions
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
	
	const isAnswerCorrect = (questionId) => {
		const question = currentQuestions.find(q => q.id === questionId)
		return answers[question.id] === question.correct_answer
	}
	
	// Отримати поточний рівень на основі кількості відповідей
	const getCurrentLevelByAnsweredCount = (totalAnswered) => {
		for (let i = 0; i < levelRanges.length; i++) {
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
		
		for (let i = level.rangeStart; i <= level.rangeEnd && i < isQuestion.length; i++) {
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
		
		for (let i = 0; i < levelRanges.length; i++) {
			const level = levelRanges[i]
			const { correctCount, answeredCount } = getCorrectAnswersInLevel(level)
			const questionsInLevel = level.rangeEnd - level.rangeStart + 1

			
			console.log(`Перевірка рівня ${level.level}: ${answeredCount}/${questionsInLevel} відповідей`)
			
			if (answeredCount > 0) {
				if (answeredCount === questionsInLevel) {
					lastCompletedLevelIndex = i
					console.log(`  → Рівень ${level.level} завершено`)
				} else {
					currentLevelIndex = i
					console.log(`  → Рівень ${level.level} в процесі`)
					break
				}
			}
		}
		
		const levelIndexToCheck = currentLevelIndex >= 0 ? currentLevelIndex : lastCompletedLevelIndex
		
		if (levelIndexToCheck < 0) {
			levelIndexToCheck = 0
		}
		
		const currentLevel = levelRanges[levelIndexToCheck]
		const questionsInLevel = currentLevel.rangeEnd - currentLevel.rangeStart + 1

		const { correctCount, answeredCount } = getCorrectAnswersInLevel(currentLevel)
		const requiredCorrect = Math.ceil(questionsInLevel * 0.8)
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
		const totalAnswered = Object.keys(answers).length
		
		console.log('\n=== handleNextPage ===')
		console.log('Поточна сторінка:', currentPage)
		console.log('Всього відповідей:', totalAnswered)
		
		// Знаходимо який рівень зараз проходить користувач
		let currentLevelData = null
		let lastCompletedLevelIndex = -1
		
		for (let i = 0; i < levelRanges.length; i++) {
			const level = levelRanges[i]
			const questionsInLevel = level.rangeEnd - level.rangeStart + 1
			
			// Підраховуємо скільки відповідей є в цьому рівні
			let answeredInLevel = 0
			for (let q = level.rangeStart; q <= level.rangeEnd && q < isQuestion.length; q++) {
				const question = isQuestion[q]
				if (answers[question.id] !== undefined) {
					answeredInLevel++
				}
			}
			
			console.log(`Рівень ${level.level} (${level.rangeStart}-${level.rangeEnd}): ${answeredInLevel}/${questionsInLevel} відповідей`)
			
			// Якщо рівень повністю пройдено
			if (answeredInLevel === questionsInLevel) {
				lastCompletedLevelIndex = i
				console.log(`→ Рівень ${level.level} повністю завершено`)
				// НЕ робимо break, продовжуємо шукати далі
				continue
			}
			
			// Якщо є відповіді в цьому рівні, але не всі - це поточний активний рівень
			if (answeredInLevel > 0 && answeredInLevel < questionsInLevel) {
				currentLevelData = { ...level, index: i, answeredInLevel, questionsInLevel }
				console.log('→ Поточний активний рівень:', level.level)
				break
			}
		}
		
		// Якщо не знайшли активний рівень, але є завершені - беремо останній завершений
		if (!currentLevelData && lastCompletedLevelIndex >= 0) {
			const level = levelRanges[lastCompletedLevelIndex]
			const questionsInLevel = level.rangeEnd - level.rangeStart + 1
			currentLevelData = {
				...level,
				index: lastCompletedLevelIndex,
				answeredInLevel: questionsInLevel,
				questionsInLevel
			}
			console.log('→ Аналізуємо останній завершений рівень:', level.level)
		}
		
		console.log('Поточний рівень для перевірки:', currentLevelData)
		
		if (!currentLevelData) {
			// Не знайдено поточний рівень - просто переходимо далі
			console.log('→ Рівень не визначено, переходимо далі')
			setShowPageResults(false)
			setCurrentPage(currentPage + 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}
		
		// Перевіряємо поточний рівень
		const { correctCount, answeredCount } = getCorrectAnswersInLevel(currentLevelData)
		const questionsInLevel = currentLevelData.questionsInLevel
		const requiredCorrect = Math.ceil(questionsInLevel * 0.8)
		const percentage = (correctCount / questionsInLevel) * 100
		
		console.log('Аналіз рівня:', currentLevelData.level)
		console.log('Питань у рівні:', questionsInLevel)
		console.log('Відповідей у рівні:', answeredCount)
		console.log('Правильних:', correctCount)
		console.log('Потрібно для проходження:', requiredCorrect)
		console.log('Відсоток:', percentage.toFixed(1) + '%')
		
		// Перевіряємо чи завершено поточний рівень
		const isLevelComplete = answeredCount === questionsInLevel
		
		if (!isLevelComplete) {
			// Рівень ще не завершено - продовжуємо
			console.log('→ Рівень в процесі, продовжуємо')
			setShowPageResults(false)
			setCurrentPage(currentPage + 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}
		
		// Рівень завершено - перевіряємо чи пройдено (80% правильних)
		const passed = correctCount >= requiredCorrect
		
		if (!passed) {
			// Не пройдено - ЗАВЕРШУЄМО ТЕСТ
			// Фінальний рівень = попередній успішно пройдений рівень
			const finalLevel = currentLevelData.index > 0
				? levelRanges[currentLevelData.index - 1].level
				: levelRanges[0].level // Якщо перший рівень не пройдено - все одно A1
			
			console.log('❌ Рівень не пройдено')
			console.log('Фінальний рівень користувача:', finalLevel)
			console.log('ЗАВЕРШУЄМО ТЕСТ')
			
			setUserLevel({
				level: finalLevel,
				score: correctCount,
				total: questionsInLevel,
				percentage: percentage
			})
			
			await handleSetLevel(finalLevel)
			return // ВАЖЛИВО: тут завершуємо тест, не йдемо далі
		}
		
		console.log('✅ Рівень пройдено успішно')
		
		// Перевіряємо чи це останній рівень
		if (currentLevelData.index === levelRanges.length - 1) {
			// Останній рівень пройдено - це найвищий рівень C1
			console.log('🎉 Досягнуто найвищий рівень!')
			
			setUserLevel({
				level: currentLevelData.level,
				score: correctCount,
				total: questionsInLevel,
				percentage: percentage
			})
			
			await handleSetLevel(currentLevelData.level)
			return
		}
		
		// Рівень пройдено успішно і є ще рівні - продовжуємо тестування
		if (!isLastPage) {
			console.log('→ Переходимо до наступного рівня')
			setShowPageResults(false)
			setCurrentPage(currentPage + 1)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			// На всякий випадок, якщо це остання сторінка
			console.log('→ Остання сторінка, встановлюємо поточний рівень')
			setUserLevel({
				level: currentLevelData.level,
				score: correctCount,
				total: questionsInLevel,
				percentage: percentage
			})
			await handleSetLevel(currentLevelData.level)
		}
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
						<div className="questionDescription">
							<p>{question.description}</p>
						</div>
						<div className="questionContainer">
							<span className="questionNumber">{getQuestionNumber(question)}</span>
							<p className="questionText" dangerouslySetInnerHTML={{__html: processQuestionText(question, hovered)}}/>
						</div>
					</>
				)
			
			case 2:
				return (
					<>
						<div className="audioContainer">
							<audio controls src={question.task}>
								Your browser does not support the audio element.
							</audio>
						</div>
						<div className="questionContainer">
							<span className="questionNumber">{getQuestionNumber(question)}</span>
							<p className="questionText" dangerouslySetInnerHTML={{__html: processQuestionText(question, hovered)}}/>
						</div>
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
	
	const renderType12Questions = () => (
		<div className='questionsList'>
			{currentQuestions.map((question) => {
				const isCorrect = showPageResults ? isAnswerCorrect(question.id) : null
				
				return (
					<div key={question.id}
					     className={`questionItem ${showPageResults ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
						<div className='questionHeader'>
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
					
					{currentType === 1 &&
						<h2 className='task'>Read and select the best option</h2>
					}
					
					{currentType === 2 &&
						<h2 className='task'>Listen and answer the question</h2>
					}
					
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