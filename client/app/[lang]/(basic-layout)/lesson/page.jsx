"use client";

import './lessonStyle.scss';
import Link from 'next/link'
import {useTranslation} from '@/context/TranslationProvider'
import {useEffect, useState} from 'react'

export default function Lesson() {
	const {locale} = useTranslation();
	const [levels, setLevels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		async function fetchLevels() {
			try {
				const response = await fetch('/api/levels');
				if (!response.ok) {
					throw new Error('Помилка завантаження даних');
				}
				const data = await response.json();
				setLevels(data.levels || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		
		fetchLevels();
	}, []);
	
	if (loading) {
		return (
			<section className="lessons">
				<h1 className="title">
					<div className="container">
						Всі рівні
					</div>
				</h1>
				<div className="container">
					<p>Завантаження...</p>
				</div>
			</section>
		);
	}
	
	if (error) {
		return (
			<section className="lessons">
				<h1 className="title">
					<div className="container">
						Всі рівні
					</div>
				</h1>
				<div className="container">
					<p>Помилка: {error}</p>
				</div>
			</section>
		);
	}
	
	return (
		<>
			<section className="lessons">
				<h1 className="title">
					<div className="container">
						Всі рівні
					</div>
				</h1>
				
				<div className="container">
					
					<div className="lesson-list">
						
						{levels.map((level) => (
							<Link
								key={level.id}
								href={`/${locale !== 'ru' ? `level/${level.id}` : `ru/level/${level.id}`}`}
							>
								<div className="lesson-item">
									
									<div className="lesson-detail">
										<div className="lesson-title">
											{level?.level}
										</div>
										<div className="lesson-pre-title">
											{level?.title}
										</div>
										<div className="lesson-description">
											{level?.description}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
