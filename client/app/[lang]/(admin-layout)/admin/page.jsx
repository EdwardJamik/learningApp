"use client";

import './style.scss'
import SideBar from '@/app/components/AdminSideBar/SideBar'
import AdminHeader from '@/app/components/AdminHeader/AdminHeader'

const Admin = () => {
	return (
		<div className="dashboard">
			
			<AdminHeader/>
			
			<div className="dashboard__content">
				
				<SideBar/>
				
				<main className="main">
					<section className="section">
						<h2 className="section__title">
							<svg className="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
							     viewBox="0 0 50 50" fill="none">
								<rect width="50" height="50" rx="15" fill="#E7E8FE"/>
								<g clipPath="url(#clip0_80_6205)">
									<path
										d="M30 36.251V33.751C30 32.4249 29.4732 31.1531 28.5355 30.2154C27.5979 29.2778 26.3261 28.751 25 28.751H17.5C16.1739 28.751 14.9021 29.2778 13.9645 30.2154C13.0268 31.1531 12.5 32.4249 12.5 33.751V36.251M30 13.911C31.0722 14.1889 32.0217 14.8151 32.6996 15.6911C33.3775 16.5671 33.7452 17.6433 33.7452 18.751C33.7452 19.8586 33.3775 20.9349 32.6996 21.8109C32.0217 22.6869 31.0722 23.313 30 23.591M37.5 36.251V33.751C37.4992 32.6431 37.1304 31.5669 36.4517 30.6914C35.773 29.8158 34.8227 29.1904 33.75 28.9135M26.25 18.751C26.25 21.5124 24.0114 23.751 21.25 23.751C18.4886 23.751 16.25 21.5124 16.25 18.751C16.25 15.9896 18.4886 13.751 21.25 13.751C24.0114 13.751 26.25 15.9896 26.25 18.751Z"
										stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
								</g>
								<defs>
									<clipPath id="clip0_80_6205">
										<rect width="30" height="30" fill="white" transform="translate(10 10)"/>
									</clipPath>
								</defs>
							</svg>
							Учні
						</h2>
						
						<div className="students-table">
							<div className="students-table__header">
								<div className="students-table__col">Ім'я</div>
								<div className="students-table__col">Прогрес</div>
								<div className="students-table__col">Дії</div>
							</div>
							
							<div className="student-row">
								<div className="student-row__name">Test User</div>
								<div className="student-row__progress">
									<div className="progress-bar">
										<div className="progress-bar__fill" style={{width: '0%'}}></div>
									</div>
									<span className="progress-label">A2 | 0%</span>
								</div>
								<div className="student-row__actions">
									<button className="btn btn--outline">Відкрити кабінет</button>
								</div>
							</div>
							
						</div>
					</section>
					
					<section className="section">
						<h2 className="section__title">
							<svg className='icon' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
								<rect width="50" height="50" rx="15" fill="#E7E8FE"/>
								<path
									d="M30 27.5V30.25L32 31.5M30 15H32.5C33.163 15 33.7989 15.2634 34.2678 15.7322C34.7366 16.2011 35 16.837 35 17.5V18.54M20 15H17.5C16.837 15 16.2011 15.2634 15.7322 15.7322C15.2634 16.2011 15 16.837 15 17.5V35C15 35.663 15.2634 36.2989 15.7322 36.7678C16.2011 37.2366 16.837 37.5 17.5 37.5H20M37.5 30C37.5 34.1421 34.1421 37.5 30 37.5C25.8579 37.5 22.5 34.1421 22.5 30C22.5 25.8579 25.8579 22.5 30 22.5C34.1421 22.5 37.5 25.8579 37.5 30ZM21.25 12.5H28.75C29.4404 12.5 30 13.0596 30 13.75V16.25C30 16.9404 29.4404 17.5 28.75 17.5H21.25C20.5596 17.5 20 16.9404 20 16.25V13.75C20 13.0596 20.5596 12.5 21.25 12.5Z"
									stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							Розмовні уроки
						</h2>
						
						<div className="lessons">
							<div className="lesson-card">
								<div className="lesson-card__info">
									<p className="lesson-card__name">Test User</p>
									<div className="lesson-card__datetime">
										22.11.2025 | 11:00
										<svg className="icon icon--calendar" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
											<path
												d="M6.66667 1.66699V5.00033M13.3333 1.66699V5.00033M2.5 8.33366H17.5M4.16667 3.33366H15.8333C16.7538 3.33366 17.5 4.07985 17.5 5.00033V16.667C17.5 17.5875 16.7538 18.3337 15.8333 18.3337H4.16667C3.24619 18.3337 2.5 17.5875 2.5 16.667V5.00033C2.5 4.07985 3.24619 3.33366 4.16667 3.33366Z"
												stroke="#FE502D" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</div>
								</div>
								<div className="lesson-card__actions">
									<button className="btn btn--outline">Підтвердити</button>
									<button className="btn btn--outline">Скасувати</button>
								</div>
							</div>
							
							
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}

export default Admin