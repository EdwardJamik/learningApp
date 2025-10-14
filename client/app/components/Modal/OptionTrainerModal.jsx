'use client';
import Modal from './Modal';
import './modal.scss'
import { useRouter } from 'next/navigation';

export default function OptionTrainerModal({ isOpen, onClose, type }) {
	const router = useRouter();
	
	// const handleStartLearning = () => {
	// 	onClose();
	// 	router.push('/dashboard');
	// };
	
	return (
		<Modal isOpen={isOpen} onClose={onClose} type={'word-learning'}>
			<div className="modal-content word-learning ">
				<h1 className="modal-title">1. Daily Routines</h1>
				
				<div className="modal-actions">
					<a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
							<path
								d="M30 20H27.52C27.083 19.9991 26.6577 20.1413 26.3091 20.405C25.9606 20.6686 25.708 21.0392 25.59 21.46L23.24 29.82C23.2249 29.8719 23.1933 29.9175 23.15 29.95C23.1067 29.9825 23.0541 30 23 30C22.9459 30 22.8933 29.9825 22.85 29.95C22.8067 29.9175 22.7751 29.8719 22.76 29.82L17.24 10.18C17.2249 10.1281 17.1933 10.0825 17.15 10.05C17.1067 10.0175 17.0541 10 17 10C16.9459 10 16.8933 10.0175 16.85 10.05C16.8067 10.0825 16.7751 10.1281 16.76 10.18L14.41 18.54C14.2925 18.9592 14.0414 19.3285 13.6949 19.592C13.3483 19.8555 12.9253 19.9988 12.49 20H10"
								stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<p>Активне тренування</p>
					</a>
					<a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
							<path
								d="M17 16H24M16 20H22M19 24H24M13 11H27C28.1046 11 29 11.8954 29 13V27C29 28.1046 28.1046 29 27 29H13C11.8954 29 11 28.1046 11 27V13C11 11.8954 11.8954 11 13 11Z"
								stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<p>Усі слова</p>
					</a>
					<a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
							<path
								d="M20.9999 29.0004H28.9999M29.1739 14.8124C29.7026 14.2838 29.9997 13.5668 29.9998 12.8192C29.9999 12.0716 29.703 11.3546 29.1744 10.8259C28.6459 10.2972 27.9289 10.0001 27.1813 10C26.4337 9.99991 25.7166 10.2968 25.1879 10.8254L11.8419 24.1744C11.6098 24.4059 11.438 24.6909 11.3419 25.0044L10.0209 29.3564C9.99509 29.4429 9.99314 29.5347 10.0153 29.6222C10.0374 29.7097 10.0829 29.7896 10.1467 29.8534C10.2106 29.9172 10.2906 29.9624 10.3781 29.9845C10.4656 30.0065 10.5575 30.0044 10.6439 29.9784L14.9969 28.6584C15.3101 28.5631 15.5951 28.3925 15.8269 28.1614L29.1739 14.8124Z"
								stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<p>Напиши слово</p>
					</a>
					<a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
							<path
								d="M12 27.5V12.5C12 11.837 12.2634 11.2011 12.7322 10.7322C13.2011 10.2634 13.837 10 14.5 10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V29C28 29.2652 27.8946 29.5196 27.7071 29.7071C27.5196 29.8946 27.2652 30 27 30H14.5C13.837 30 13.2011 29.7366 12.7322 29.2678C12.2634 28.7989 12 28.163 12 27.5ZM12 27.5C12 26.837 12.2634 26.2011 12.7322 25.7322C13.2011 25.2634 13.837 25 14.5 25H28M16 21L20 14L24 21M17.1 19H22.8"
								stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<p>Завчання</p>
					</a>
					<a href="#">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
							<path
								d="M18 17V24M22 14V24M29 20.5C29 22.433 27.433 24 25.5 24C23.567 24 22 22.433 22 20.5C22 18.567 23.567 17 25.5 17C27.433 17 29 18.567 29 20.5ZM18 20.5C18 22.433 16.433 24 14.5 24C12.567 24 11 22.433 11 20.5C11 18.567 12.567 17 14.5 17C16.433 17 18 18.567 18 20.5Z"
								stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<p>Обери переклад</p>
					</a>
				</div>
			
</div>
</Modal>
)
	;
}