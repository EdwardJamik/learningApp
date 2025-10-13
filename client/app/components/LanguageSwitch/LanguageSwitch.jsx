'use client';

import React from 'react';
import './Languageswitcher.scss';
import { useTranslation } from '@/context/TranslationProvider';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalizedPath } from '@/app/components/utils/getLocalizedPath';

const LanguageSwitch = () => {
	const { locale, setLocale } = useTranslation();
	const pathname = usePathname();
	const router = useRouter();
	
	// Нормалізуємо locale - якщо undefined або null, то 'uk'
	const currentLocale = locale || 'uk';
	
	const switchLanguage = (lang) => {
		if (lang === currentLocale) return;
		
		setLocale(lang);
		
		const newPath = getLocalizedPath(pathname, lang);
		router.push(newPath);
	};
	
	return (
		<div className="language-switcher">
			<button
				className={currentLocale === 'ru' ? 'active' : ''}
				onClick={() => switchLanguage('ru')}
			>
				Рус
			</button>
			<span>/</span>
			<button
				className={currentLocale !== 'ru' ? 'active' : ''}
				onClick={() => switchLanguage('uk')}
			>
				УКР
			</button>
		</div>
	);
};

export default LanguageSwitch;