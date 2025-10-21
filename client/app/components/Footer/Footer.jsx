'use client';

import React from 'react'
import './Footer.scss'
import Image from 'next/image'

import Logo from '../../assets/Header/logo.png'
import {useTranslation} from '@/context/TranslationProvider'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useAuth} from '@/context/AuthContext'
const Footer = () => {
	const { user, loading, logout } = useAuth();
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
						
						
						{user ?
							<><Link href={`/${locale !== 'ru' ? 'dashboard' : 'ru/dashboard'}`}
							        className={`button-filled full-width`} style={{width:'100%', maxWidth:'150px'}}
							>Мій кабінет
							</Link></>
							:
							<><Link href={`/${locale !== 'ru' ? 'login' : 'ru/login'}`} className="button-filled full-width">Вхід до
								кабінету</Link></>
						}
					</div>
				</div>
				<div className="bottom-side">
					<p>© 2025 Онлайн-школа англійської мови. Всі права захищено.
						<Link target='_blank' href={`${locale !== 'ru' ? 'https://docs.google.com/document/d/1QvcJgZTmH--Rp8Z6W0sqvdvEb-IVSCJ8jTbvtuKHJMY/edit?tab=t.0' : 'https://docs.google.com/document/d/1r8bnmKO_46bWgbBr1Qjn1fGZLvfHhN0RfDgGxDKlhN4/edit?tab=t.0'}`}>Політика конфіденційності</Link>
						<Link target='_blank' href={`${locale !== 'ru' ? 'https://docs.google.com/document/d/1-AjEH3rB7HuHsLwsy6FP5lMy68IRXktxyEeWf0REuI4/edit?tab=t.0' : 'https://docs.google.com/document/d/1UcwTSlWTwH7pshR_7g0IC25Zct1sDm8NPtLWo868I9I/edit?tab=t.0'}`}>Договір оферти</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer