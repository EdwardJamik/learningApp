'use client';

import './sideBar.scss'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const SideBar = () => {
	const pathname = usePathname();
	
	return (
		<aside className="sidebar">
			<div className="sidebar__section">
				<h2 className="sidebar__title">
					<svg className='icon' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
						<path
							d="M30 36.25V33.75C30 32.4239 29.4732 31.1521 28.5355 30.2145C27.5979 29.2768 26.3261 28.75 25 28.75H17.5C16.1739 28.75 14.9021 29.2768 13.9645 30.2145C13.0268 31.1521 12.5 32.4239 12.5 33.75V36.25M30 13.91C31.0722 14.188 32.0217 14.8141 32.6996 15.6901C33.3775 16.5661 33.7452 17.6424 33.7452 18.75C33.7452 19.8576 33.3775 20.9339 32.6996 21.8099C32.0217 22.6859 31.0722 23.312 30 23.59M37.5 36.25V33.75C37.4992 32.6422 37.1304 31.566 36.4517 30.6904C35.773 29.8148 34.8227 29.1895 33.75 28.9125M26.25 18.75C26.25 21.5114 24.0114 23.75 21.25 23.75C18.4886 23.75 16.25 21.5114 16.25 18.75C16.25 15.9886 18.4886 13.75 21.25 13.75C24.0114 13.75 26.25 15.9886 26.25 18.75Z"
							stroke="black" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					Навігація
				</h2>
				
				<nav className="sidebar__nav">
					<Link href={'/admin/students'} className={`nav-item ${pathname === '/admin/students' &&  'nav-item--active'}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<g clipPath="url(#clip0_335_385)">
								<path
									d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M16 3.128C16.8578 3.35037 17.6174 3.85126 18.1597 4.55206C18.702 5.25286 18.9962 6.11389 18.9962 7C18.9962 7.88611 18.702 8.74714 18.1597 9.44794C17.6174 10.1487 16.8578 10.6496 16 10.872M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
									stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</g>
							<defs>
								<clipPath id="clip0_335_385">
									<rect width="24" height="24" fill="white"/>
								</clipPath>
							</defs>
						</svg>
						Учні
					</Link>
					<Link href={'/admin/lesson'} className={`nav-item ${pathname === '/admin/lesson' &&  'nav-item--active'}`}>
						<svg className='icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M16 14V16.2L17.6 17.2M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V6.832M8 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H8M22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16ZM9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V3C8 2.44772 8.44772 2 9 2Z"
								stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						Розмовні уроки
					</Link>
				</nav>
			</div>
			
			<div className="stat-card">

				<svg className="stat-card__icon" xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
					<rect y="0.5" width="60" height="60" rx="18" fill="#E7E8FE"/>
					<g clipPath="url(#clip0_80_6197)">
						<path
							d="M36 44.001V41.001C36 39.4097 35.3679 37.8836 34.2426 36.7583C33.1174 35.6331 31.5913 35.001 30 35.001H21C19.4087 35.001 17.8826 35.6331 16.7574 36.7583C15.6321 37.8836 15 39.4097 15 41.001V44.001M36 17.193C37.2866 17.5265 38.4261 18.2779 39.2395 19.3291C40.0529 20.3803 40.4943 21.6718 40.4943 23.001C40.4943 24.3301 40.0529 25.6217 39.2395 26.6729C38.4261 27.7241 37.2866 28.4754 36 28.809M45 44.001V41.001C44.999 39.6716 44.5565 38.3801 43.742 37.3294C42.9276 36.2788 41.7872 35.5283 40.5 35.196M31.5 23.001C31.5 26.3147 28.8137 29.001 25.5 29.001C22.1863 29.001 19.5 26.3147 19.5 23.001C19.5 19.6873 22.1863 17.001 25.5 17.001C28.8137 17.001 31.5 19.6873 31.5 23.001Z"
							stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<defs>
						<clipPath id="clip0_80_6197">
							<rect width="36" height="36" fill="white" transform="translate(12 12.5)"/>
						</clipPath>
					</defs>
				</svg>
				<div className="stat-card__content">
					<p className="stat-card__label">Всього учнів</p>
					<p className="stat-card__value">3</p>
				</div>
			</div>
			
			<div className="stat-card">
				<svg className="stat-card__icon" xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
					<rect y="0.5" width="60" height="60" rx="18" fill="#E7E8FE"/>
					<path
						d="M36 33.5V36.8L38.4 38.3M36 18.5H39C39.7956 18.5 40.5587 18.8161 41.1213 19.3787C41.6839 19.9413 42 20.7044 42 21.5V22.748M24 18.5H21C20.2044 18.5 19.4413 18.8161 18.8787 19.3787C18.3161 19.9413 18 20.7044 18 21.5V42.5C18 43.2956 18.3161 44.0587 18.8787 44.6213C19.4413 45.1839 20.2044 45.5 21 45.5H24M45 36.5C45 41.4706 40.9706 45.5 36 45.5C31.0294 45.5 27 41.4706 27 36.5C27 31.5294 31.0294 27.5 36 27.5C40.9706 27.5 45 31.5294 45 36.5ZM25.5 15.5H34.5C35.3284 15.5 36 16.1716 36 17V20C36 20.8284 35.3284 21.5 34.5 21.5H25.5C24.6716 21.5 24 20.8284 24 20V17C24 16.1716 24.6716 15.5 25.5 15.5Z"
						stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				<div className="stat-card__content">
					<p className="stat-card__label">Очікують підтвердження</p>
					<p className="stat-card__value">12</p>
				</div>
			</div>
		</aside>
	)
}

export default SideBar