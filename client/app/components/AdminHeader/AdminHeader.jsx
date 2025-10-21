'use client';

import './adminHeader.scss'
import Link from 'next/link'

const AdminHeader = () => {

	
	return (
			<header className="header">
				<h1 className="header__title">Панель викладача</h1>
				<Link href={'/admin'} className="btn btn-primary header__button">На головну</Link>
			</header>
	)
}

export default AdminHeader