'use client';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export default function TestResultModal({ isOpen, onClose, level }) {
	const router = useRouter();
	
	const handleStartLearning = () => {
		onClose();
		router.push('/dashboard');
	};
	
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="modal-content">
				<h1 className="modal-title">
					Вітаємо! Ви успішно завершили тестування з англійської мови
				</h1>
				
				<p className="modal-subtitle">
					Це чудовий результат, продовжуйте вдосконалювати свої навички!
				</p>
				
				<div className="modal-actions">
					<div className="level-card">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							className="medal-icon"
						>
							<path
								d="M15.2095 23L10.6595 15.14C10.4633 14.8009 10.371 14.4116 10.3941 14.0205C10.4172 13.6294 10.5547 13.2537 10.7895 12.94L12.3995 10.8C12.5858 10.5516 12.8273 10.35 13.105 10.2111C13.3828 10.0723 13.689 10 13.9995 10H25.9995C26.31 10 26.6162 10.0723 26.8939 10.2111C27.1716 10.35 27.4132 10.5516 27.5995 10.8L29.1995 12.94C29.4358 13.2527 29.575 13.6278 29.5999 14.019C29.6248 14.4101 29.5343 14.7999 29.3395 15.14L24.7895 23M18.9995 20L13.1195 10.2M20.9995 20L26.8795 10.2M15.9995 15H23.9995M19.9995 26V24H19.4995M24.9995 25C24.9995 27.7614 22.7609 30 19.9995 30C17.238 30 14.9995 27.7614 14.9995 25C14.9995 22.2386 17.238 20 19.9995 20C22.7609 20 24.9995 22.2386 24.9995 25Z"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="level-text">
							<span className="level-label">Ваш рівень англійської</span>
							<span className="level-separator"> – </span>
							<span className="level-value">{level}</span>
						</div>
					</div>
					
					<button className="btn btn-primary" onClick={handleStartLearning}>
						Розпочати навчання
					</button>
				</div>
			</div>
		</Modal>
	);
}