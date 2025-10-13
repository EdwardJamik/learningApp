'use client';

import React from 'react'
import './Footer.scss'
import Image from 'next/image'

import Logo from '../../assets/Header/logo.png'
import {useTranslation} from '@/context/TranslationProvider'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
const Footer = () => {
	const pathname = usePathname();
	const { locale } = useTranslation();
	
	const isHome =
		pathname === '/' ||
		pathname === '/uk' ||
		pathname === '/ru';
	
	if(!isHome) return null
	
	return (
		<footer>
			<div className="container">
				<div className="top-side">
					<Link href={`/${locale !== 'ru' ? '' : 'ru/'}`}>
					<div className="logo">
						<Image src={Logo} alt="Ivan English"/>
						<span>онлайн-Школа англійської мови</span>
					</div>
					</Link>
					<nav>
						<ul>
							<li><a href={`/${locale !== 'ru' ? '' : 'ru'}`}>Головна</a></li>
							<li><a href={`/${locale !== 'ru' ? 'lesson' : 'ru/lesson'}`}>Уроки</a></li>
							<li><a href={`/${locale !== 'ru' ? 'special' : 'ru/special'}`}>Спецкурси</a></li>
						</ul>
					</nav>
					
					<div className="right-side">
						<a href="#">Політика конфіденційності</a>
						<a href={`/${locale !== 'ru' ? 'login' : 'ru/login'}`} className="button-filled">Вхід до кабінету</a>
					</div>
				</div>
				<div className="bottom-side">
					<p>© 2025 Онлайн-школа англійської мови. Всі права захищено.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer