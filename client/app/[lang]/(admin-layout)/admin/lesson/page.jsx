import './lesson.scss'
import AdminHeader from '@/app/components/AdminHeader/AdminHeader'
import SideBar from '@/app/components/AdminSideBar/SideBar'
const Lesson = () => {
	return (
		<div className="dashboard">
			
			<AdminHeader />
			
			<div className="dashboard__content">
				<SideBar/>
				
				<main className="main">
					<section className="section">
						<h2 className="section__title">
							<svg className='icon' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"
							     fill="none">
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
										<svg className="icon icon--calendar" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
										     viewBox="0 0 20 20" fill="none">
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
					
					<div className="pagination">
						<button className="pagination__arrow" aria-label="Previous page">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
								      strokeLinejoin="round"/>
							</svg>
						</button>
						<button className="pagination__number">1</button>
						<button className="pagination__number pagination__number--active">2</button>
						<button className="pagination__number">3</button>
						<span className="pagination__dots">...</span>
						<button className="pagination__number">8</button>
						<button className="pagination__arrow" aria-label="Next page">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
								      strokeLinejoin="round"/>
							</svg>
						</button>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Lesson