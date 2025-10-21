import './students.scss'
import AdminHeader from '@/app/components/AdminHeader/AdminHeader'
import SideBar from '@/app/components/AdminSideBar/SideBar'
const Students = () => {
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

export default Students