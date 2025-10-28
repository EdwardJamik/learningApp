import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
	try {
		// Шлях до JSON файлу
		const filePath = path.join(process.cwd(), 'data', 'courses.json')
		
		// Читаємо файл при КОЖНОМУ запиті (без кешування)
		const fileContent = fs.readFileSync(filePath, 'utf8')
		const data = JSON.parse(fileContent)
		
		return NextResponse.json(data)
	} catch (error) {
		console.error('Помилка читання файлу:', error)
		return NextResponse.json(
			{ error: 'Не вдалося завантажити дані' },
			{ status: 500 }
		)
	}
}

// Опціонально: додамо підтримку кешування з можливістю revalidate
export const dynamic = 'force-dynamic' // Завжди виконувати на сервері
// або
// export const revalidate = 0 // Відключити кешування