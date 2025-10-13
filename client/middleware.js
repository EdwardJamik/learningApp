import { NextResponse } from 'next/server';
import { i18n } from './i18n.config';

export function middleware(request) {
	const { pathname } = request.nextUrl;
	const locales = i18n.locales;
	
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
	;
	
	// 2. Якщо локалі немає, перенаправляємо на defaultLocale (`/ua`).
	if (!pathnameHasLocale) {
		const url = request.nextUrl.clone();
		url.pathname = `/${i18n.defaultLocale}${pathname}`;
		return NextResponse.rewrite(url);
	}
	
	// 3. Якщо все добре, пропускаємо.
	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
	],
};
