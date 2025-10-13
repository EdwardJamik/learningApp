'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TranslationContext = createContext(undefined);

export function TranslationProvider({ children, dictionary }) {
	const pathname = usePathname();
	const [locale, setLocale] = useState(pathname.split('/')[1] || 'uk');
	
	useEffect(() => {
		const pathLocale = pathname.split('/')[1];
		if (pathLocale && pathLocale !== locale) {
			setLocale(pathLocale);
		}
	}, [pathname, locale]);
	
	const t = (key, options) => {
		const keys = key.split('.');
		let result = dictionary;
		
		for (const k of keys) {
			if (result && typeof result === 'object' && k in result) {
				result = result[k];
			} else {
				return key;
			}
		}
		
		if (typeof result === 'string') {
			let interpolatedString = result;
			if (options) {
				for (const [optionKey, value] of Object.entries(options)) {
					interpolatedString = interpolatedString.replace(
						`{${optionKey}}`,
						String(value)
					);
				}
			}
			return interpolatedString;
		} else if (Array.isArray(result)) {
			return result;
		}
		
		console.warn(`t(${key}) повертає об'єкт (не рядок):`, result);
		return key;
	};
	
	return (
		<TranslationContext.Provider value={{ t, locale, setLocale }}>
			{children}
		</TranslationContext.Provider>
	);
}

export function useTranslation() {
	const context = useContext(TranslationContext);
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider');
	}
	return context;
}
