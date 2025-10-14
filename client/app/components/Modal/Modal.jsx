'use client';
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, type, children }) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);
	
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};
		
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);
	
	if (!isOpen) return null;
	
	return (
		<div className={`modal-overlay ${isOpen && 'open'} ${type}` } onClick={onClose}>
			<div className="modal-container" onClick={(e) => e.stopPropagation()}>
				<button
					className="close-button"
					onClick={onClose}
					aria-label="Закрити"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				{children}
			</div>
		</div>
	);
}