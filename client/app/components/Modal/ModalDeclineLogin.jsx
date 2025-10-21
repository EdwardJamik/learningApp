'use client';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export default function ModalDeclineLogin({ isOpen, onClose }) {
	const router = useRouter();
	
	const handleStartLearning = () => {
		router.push('/login');
	};
	
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="modal-content">
				<h1 className="modal-title" style={{textAlign:'center'}}>
					Ви вже майже з нами!
				</h1>
				
				<p className="modal-subtitle">
					Щоб отримати <b style={{fontWeight:'700', color:'#FE502D'}}>повний доступ</b> до матеріалів, зареєструйтесь або увійдіть.
				</p>
				
				<div className="modal-actions">
					
					<button style={{height: '60px'}} className="btn btn-primary" onClick={handleStartLearning}>
						Зареєструватися
					</button>
					<button style={{height: '60px'}} className="btn btn-outline" onClick={handleStartLearning}>
						Увійти
					</button>
				</div>
				
				<p style={{textAlign:'center', marginTop:'8px'}}>Реєстрація займає лише хвилину 💫</p>
			</div>
		</Modal>
	);
}