import React from 'react'

import './lesson.scss'
import levelImage from '@/app/assets/Dashboard/photostartlevel.png'
import Image from 'next/image'

import task1 from "../../../assets/Lesson/task-1.jpg";
import task2 from "../../../assets/Lesson/task-2.jpg";
import task3 from "../../../assets/Lesson/task-3.jpg";
import task4 from "../../../assets/Lesson/task-4.jpg";
import task5 from "../../../assets/Lesson/task-5.jpg";
import task6 from "../../../assets/Lesson/task-6.jpg";
import task7 from "../../../assets/Lesson/task-7.jpg";
import task8 from "../../../assets/Lesson/task-8.jpg";
import task9 from "../../../assets/Lesson/task-img-1.jpg";

const Page = () => {
	return (
		<main className="lesson-page">
			<div className="container">
				
				<section className="lesson-block">
					<div className="lesson-labels">
						<span>A1</span>
						<span>UNIT 1</span>
						<span>LESSON 2</span>
					</div>
					<div className="lesson-title">Lesson “IDENTITY”</div>
					<div className="lesson-types">
						<div className="lesson-type grammar">
							<h4>Grammar</h4>
							<p>Present simple be: I, you</p>
						</div>
						
						<div className="lesson-type vocabulary">
							<h4>Vocabulary</h4>
							<p>Hello and goodbye; countries and nationalities</p>
						</div>
						
						<div className="lesson-type pronunciation">
							<h4>Pronunciation</h4>
							<p>Intonation in greetings</p>
						</div>
					</div>
				</section>
				
				<section className="lesson-task">
					<div className="task-type">
						Vocabulary
					</div>
					
					
					<div className="task type-1">
						<ul className="img-list">
							<li><Image src={task1} alt="Task Image" /></li>
							<li><Image src={task2} alt="Task Image" /></li>
							<li><Image src={task3} alt="Task Image" /></li>
							<li><Image src={task4} alt="Task Image" /></li>
							<li><Image src={task5} alt="Task Image" /></li>
							<li><Image src={task6} alt="Task Image" /></li>
							<li><Image src={task7} alt="Task Image" /></li>
							<li><Image src={task8} alt="Task Image" /></li>
						</ul>
						
						
						<div className="task-title">
							<h4>Match the numbers (1-8) with the words (a-h)</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								<ul className="task-question">
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
									<li>
										<select name="" id="">
											<option value="" selected></option>
											<option value="a">a</option>
											<option value="b">b</option>
											<option value="c">c</option>
											<option value="d">d</option>
											<option value="e">e</option>
											<option value="f">f</option>
											<option value="g">g</option>
											<option value="h">h</option>
										</select>
									</li>
								</ul>
								
								<ul className="task-answer">
									<li>doctor</li>
									<li>digital disigner</li>
									<li>teacher</li>
									<li>waiter</li>
									<li>singer</li>
									<li>taxi driver</li>
									<li>police officer</li>
									<li>football player</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					
					<div className="task type-2">
						
						<div className="task-title">
							<h4>Choose the word that you hear.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								<audio controls className="task-question">
									{/*<source src="horse.ogg" type="audio/ogg">*/}
									{/*	<source src="horse.mp3" type="audio/mpeg" />*/}
								</audio>
								
								<ul className="task-answer">
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
										<button>teacher</button>
									</li>
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
										<button>teacher</button>
									</li>
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
									</li>
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
										<button>teacher</button>
									</li>
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
									</li>
									<li><button>taxi driver</button>
										<button>doctor</button>
										<button>police officer</button>
										<button className="active">teacher</button>
									</li>
								</ul>
							
							
							
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task-type">
						reading
					</div>
					<div className="task type-3">
						
						<div className="task-title">
							<h4>Read the text. Match the people with the photos.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								<div className="task-question">
									<p>
										<span>Different Jobs</span><br /><br />
										From Monday to Friday, Lucy Brown is a teacher in a school in Chicago. “I love my job, but it’s not
										easy,” she says. “The students are great, but I’m always busy!” At the weekend, Lucy is a singer in a
										small club. “It’s my favorite time,” she says. “I love music, and it makes me very happy.”<br /><br />
										David Costa is from Madrid, Spain. He’s a taxi driver in New York City. “I like my work, and I meet
										many people every day,” he says. But on Saturday and Sunday, David is a waiter in an
										Italian restaurant. “It’s a long weekend, but I enjoy it,” he says. “Two jobs, two worlds — and one
										big city!”
									</p>
									<Image src={task9} alt="Task Image" />
								</div>
								
								<ul className="task-answer">
									<li>
										<h4>Lucy Brown</h4>
										<div className="answer">
											teacher
										</div>
										<div className="buttons"> <button>taxi driver</button>
											<button>doctor</button>
											<button>teacher</button>
										</div>
									
									</li>
									<li>
										<h4>David Costa</h4>
										<div className="answer">
											taxi driver
										</div>
										<div className="buttons">
											<button>taxi driver</button>
											<button>doctor</button>
											<button>teacher</button>
										</div>
									</li>
									<li>
										<h4>Who is from New York City</h4>
										<div className="answer">
											David
										</div>
										<div className="buttons">
											<button>David</button>
											<button>Lucy</button>
										</div>
									</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task type-4">
						
						<div className="task-title">
							<h4>Read the article again. Choose the right answers.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								
								<ul className="task-answer">
									<li>
										<h4>At work Lucy is always ... </h4>
										<div className="buttons"> <button>busy</button>
											<button>happy</button>
											<button>relaxed</button>
										</div>
									</li>
									<li>
										<h4>At the weekend Lucy is ... </h4>
										<div className="buttons"> <button>happy</button>
											<button>sad</button>
											<button>busy</button>
										</div>
									</li>
									<li>
										<h4>David is a taxi driver and a ....</h4>
										<div className="buttons"> <button>teacher</button>
											<button>doctor</button>
											<button>waiter</button>
										</div>
									</li>
									
									<li>
										<h4>David works in ...</h4>
										<div className="buttons"> <button>New York</button>
											<button>London</button>
											<button>Paris</button>
										</div>
									</li>
									
									<li>
										<h4>David and Lucy have ...</h4>
										<div className="buttons"> <button>2 jobs</button>
											<button>1 job</button>
											<button>3 jobs</button>
										</div>
									</li>
									
									<li>
										<h4>Who works with a car?</h4>
										<div className="buttons"> <button>nobody</button>
											<button>Lucy</button>
											<button>David</button>
										</div>
									</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task-type">
						GRAMMAR
					</div>
					<div className="task type-5">
						
						<div className="task-title">
							<h4>Finish the rules.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								
								<ul className="task-answer">
									<li>
										<h4> For the positive (+), we use he/she + ...</h4>
										<div className="buttons"> <button>is</button>
											<button>are</button>
											<button>am</button>
										</div>
									</li>
									<li>
										<h4>For the negative (-), we use he/she + ...</h4>
										<div className="buttons"> <button>is no</button>
											<button>is not</button>
											<button>is net</button>
										</div>
									</li>
									<li>
										<h4>For questions (?), we use ... he/she?</h4>
										<div className="buttons"> <button>am</button>
											<button>are</button>
											<button>is</button>
										</div>
									</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task type-6">
						
						<div className="task-title">
							<h4>Read the rules and choose the best answer.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								
								<ul className="task-answer">
									<li>
										<h4> We use <b> a(n)</b> + jobs.</h4>
										<div className="buttons"> <button>I am a waiter</button>
											<button>I am waiter</button>
											<button>I am to waiter</button>
										</div>
									</li>
									<li>
										<h4>We use <b>a</b> + jobs beginning with a consonant<br />
											sound (b, c, d, f …).</h4>
										<div className="buttons"> <button>He is a doctor</button>
											<button>He is an doctor</button>
											<button>He is doctor</button>
										</div>
									</li>
									<li>
										<h4>We use <b>an</b> + jobs beginning with a vowel
											<br /> sound (a, e, o …).
										</h4>
										<div className="buttons"> <button>You are actor</button>
											<button>You are a actor</button>
											<button>You are an actor</button>
										</div>
									</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task type-7">
						
						<div className="task-title">
							<h4>Choose a or an.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								
								<ul className="task-answer">
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
									<li>
										<h4>I am <span className="space"></span>actor.</h4>
										<div className="buttons">
											<div>
												<input type="radio" />a
											</div>
											<div>
												<input type="radio" />an
											</div>
										</div>
									</li>
								</ul>
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-task">
					<div className="task-type">
						Pronunciation
					</div>
					<div className="task type-2">
						
						<div className="task-title">
							<h4>Listen and choose the correct stress.</h4>
							
							<div className="result">
								<span className="accepted">0</span>
								<span className="declined">0</span>
							</div>
						</div>
						
						<div className="task-test">
							<div className="task-test-block">
								<audio controls className="task-question">
									{/*<source src="horse.ogg" type="audio/ogg">*/}
									{/*	<source src="horse.mp3" type="audio/mpeg">*/}
								</audio>
								
								<ul className="task-answer">
									<li><button>doctor</button>
										<button>doctor</button>
									</li>
									<li><button>teacher</button>
										<button>teacher</button>
									</li>
									<li><button>waiter</button>
										<button>waiter</button>
									</li>
								</ul>
								
								<ul className="task-answer letter">
									<li><button>taxi driver</button>
										<button>taxi driver</button> <button>taxi driver</button>
									</li>
									<li><button>singer</button>
										<button>singer</button>
									</li>
								</ul>
							
							
							
							</div>
							
							<button className="button-test button-filled task-check">
								Перевірити
							</button>
						
						</div>
					
					</div>
				
				</section>
				
				<section className="lesson-results">
					<div className="lesson-results__left-side">
						<div className="lesson-results__title">
							<span className="cup"></span>
							<div>
								<h4>Клас! Так тримати</h4>
								<p>Дякуємо за проходження! Ви завершили Unit 1</p>
							</div>
						</div>
						
						<div className="lesson-results__number">
							<div className="lesson-results__number__precent">
								80%
								<span>правильних</span>
							</div>
							
							<div className="lesson-results__line">
								<span></span>
							</div>
							
							<div className="lesson-results__blocks">
								<div>
									<span className="number">8</span>
									<span>вірних</span>
								</div>
								<div>
									<span className="number">12</span>
									<span>помилок</span>
								</div>
							</div>
						</div>
					</div>
					<div className="lesson-results__right-side">
						<span>Підсумки</span>
						<div className="lesson-results__answer">
							<div>
								<h4>Вірні відповіді</h4>
								<span> 8 з 10</span>
							</div>
							<div>
								<h4>Вірні відповіді</h4>
								<span> 8 з 10</span>
							</div>
						</div>
						
						<div className="lesson-results__final">
							<span>Ви молодець!</span>
							<p>Продовжуйте до наступного юніту</p>
						</div>
					</div>
				</section>
				
				<button className="btn btn-outline next-lesson">Наступний юніт</button>
			
			</div>
		</main>
	)
}

export default Page