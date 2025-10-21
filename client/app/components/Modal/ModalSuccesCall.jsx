'use client';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export default function ModalSuccesCall({ isOpen, onClose, level }) {
	const router = useRouter();
	
	const handleStartLearning = () => {
		onClose();
		router.push('/dashboard');
	};
	
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="modal-content">
				<h1 className="modal-title">
					Вітаємо вас із успішним бронюванням уроку! Ми вже готуємось до зустрічі
				</h1>
				
				<p className="modal-subtitle">
					Доступ до вашого заняття відкриється у зазначений час. Лист-нагадування буде надіслано на вашу електронну пошту. Щоб приєднатися, натисніть кнопку <b style={{fontWeight:'700'}}>«Приєднатися»</b>.
				</p>
				
				<div className="modal-actions">
					
					<button style={{height: '60px'}} className="btn btn-primary" onClick={handleStartLearning}>
						До головної
					</button>
				</div>
			</div>
		</Modal>
	);
}