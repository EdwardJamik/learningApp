import { i18n } from '@/i18n.config';
import { TranslationProvider } from '@/context/TranslationProvider';
import { getDictionary } from '@/lib/dictionary';
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import {AuthProvider} from '@/context/AuthContext'

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {

	const { lang } = await params;
	
	const dictionary = await getDictionary(lang);

	
	return (
		<html lang={lang === 'ru' ? lang : 'uk'}>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
				rel="stylesheet"/>
			<title>Ivan English</title>
		</head>
		<body>
		<AuthProvider>
		<TranslationProvider dictionary={dictionary} lang={lang}>
			<Header/>
			{children}
			<Footer/>
		</TranslationProvider>
		</AuthProvider>
		</body>
		</html>
	);
}
