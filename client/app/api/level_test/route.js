// app/api/levels/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
	try {
		const filePath = path.join(process.cwd(), 'data', 'level_test.json');
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const data = JSON.parse(fileContent);
		
		// Оновлюємо шляхи до аудіо файлів
		const updatedQuestions = data.questions.map(question => {
			if (question.type === 2 && question.task) {
				return {
					...question,
					task: `/api/level_test/audio/${question.task.replace('./', '')}`
				};
			}
			return question;
		});
		
		return NextResponse.json({
			...data,
			questions: updatedQuestions
		});
		
	} catch (error) {
		console.error('Помилка читання файлу:', error);
		return NextResponse.json(
			{ error: 'Не вдалося завантажити дані' },
			{ status: 500 }
		);
	}
}

// Опціонально: POST для оновлення даних
export async function POST(request) {
	try {
		const data = await request.json();
		const filePath = path.join(process.cwd(), 'data', 'levels.json');
		
		// Записуємо оновлені дані
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
		
		return NextResponse.json({ message: 'Дані успішно оновлено' });
	} catch (error) {
		console.error('Помилка запису файлу:', error);
		return NextResponse.json(
			{ error: 'Не вдалося оновити дані' },
			{ status: 500 }
		);
	}
}