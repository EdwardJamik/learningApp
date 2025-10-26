// app/api/level_test/audio/[filename]/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
	try {
		const { filename } = params;
		
		// Шлях до аудіо файлу
		const filePath = path.join(process.cwd(), 'data', 'audio', filename);
		
		// Перевірка чи існує файл
		if (!fs.existsSync(filePath)) {
			return NextResponse.json(
				{ error: 'Файл не знайдено' },
				{ status: 404 }
			);
		}
		
		// Читаємо файл
		const fileBuffer = fs.readFileSync(filePath);
		
		// Визначаємо MIME тип на основі розширення
		const ext = path.extname(filename).toLowerCase();
		const mimeTypes = {
			'.mp3': 'audio/mpeg',
			'.wav': 'audio/wav',
			'.ogg': 'audio/ogg',
			'.m4a': 'audio/mp4'
		};
		
		const contentType = mimeTypes[ext] || 'audio/mpeg';
		
		// Повертаємо аудіо файл
		return new NextResponse(fileBuffer, {
			headers: {
				'Content-Type': contentType,
				'Content-Length': fileBuffer.length.toString(),
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
		
	} catch (error) {
		console.error('Помилка читання аудіо файлу:', error);
		return NextResponse.json(
			{ error: 'Не вдалося завантажити аудіо' },
			{ status: 500 }
		);
	}
}