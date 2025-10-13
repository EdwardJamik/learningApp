import '../../../components/Header/header.scss';
import '../../../../styles/riven.css';
import Link from 'next/link'


export default function Account() {
	return (
		<>
			<header className="header-pc">
				<div className="header-golov-div">
					<div className="hrader-two-block">
						<div className="flex-logo-opis">
							<div className="logo-div">
								<img src="/img/logo.png"/>
							</div>
							<hr className="rozdiln"/>
							<div className="opis-header-opis">
								онлайн-Школа англійської мови
							</div>
						</div>
						<div className="div-manu-header">
							<ul className="ul-header-menus">
								<li className="ul-header-menus"><Link href={'/'}>Головна</Link></li>
								<li className="ul-header-menus"><Link href={'/lesson'}>Уроки</Link></li>
								<li className="ul-header-menus"><Link href={'/special'}>Спецкурси</Link></li>
							</ul>
						</div>
						<div className="tri-block-div">
							<div className="soc-block">
								<div className="soc-block">
									<Link href="#" className="soc-link"><img src="/img/tg.svg"/></Link>
									<a href="#" className="soc-link"><img src="/img/viber.svg"/></a>
									<a href="#" className="soc-link"><img src="/img/fb.svg"/></a>
								</div>
							</div>
							<div className="sing-up-block">
								<Link className="sing-up-btn" href={'/dashboard'}>Мій кабінет</Link>
							</div>
							<div className="leng-btns">
								РУС/УКР
							</div>
						</div>
					</div>
				</div>
			</header>
			<header className="header-mob">
				<div className="header-golov-div">
					<div className="hrader-two-block">
						<div className="flex-logo-opis">
							<div className="logo-div">
								<img src="/img/logo.png"/>
							</div>
							<hr className="rozdiln"/>
							<div className="opis-header-opis">
								онлайн-Школа англійської мови
							</div>
						</div>
						<div className="tri-block-div">
							<div className="sing-up-block">
								<Link className="sing-up-btn" href={'/login'}>Вхід до кабінету</Link>
							</div>
							<img src="/img/burger.svg" alt={'burgermenu'}/>
						</div>
					</div>
				</div>
			</header>
			
			<section className="storinka-title">
				<div className="title-div-one">
					<div className="title-div-two">
						<h1 className="title-page-h1">A1 / Elementary</h1>
					</div>
				</div>
			</section>
			
			<section className="section-lesons">
				<div className="div-lesons">
					<div className="grid-lesons">
						<div className="leson">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">A1</h2>
									<div className="tooltip">
										<img src="img/Frame711.svg" alt="icon" width="30" />
											<div className="tooltiptext">
												Ви перебуваєте <br/> зараз на цьому рівні
											</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Elementary</h3>
								Ви можете прості слова та повсякденні фрази, щоб розповісти про себе та своє оточення
							</div>
							<div className="icon-leson">
								<img src="/img/818089bd0642402dbfc99bd9e07dfe7408134ba1.png" />
							</div>
						</div>
						<div className="kol-rozdilov">
							<div className="div-info-roz">
								<h3 className="h3-info-roz">10 розділів / 80 занять</h3>
								Заверешено 0 / 8 занять
							</div>
							<div className="klv-rozdilov-btn">
								<button className="btn-rlv-rozdil">Продовжити</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<section className="progres-tests-section">
				<div className="div-progres-tests">
					<div className="flex-div-progres-div">
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">1.Verb to be in present simple</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">2.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">3.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">4.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">5.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">6.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">7.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">8.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">9.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
						
						<div className="test-progres-golov">
							<div className="flex-text-test">
								<div className="texts-progres-test">
									<h3 className="zagolovok-test-prog">10.Present Simple usage and positive sentences</h3>
									Завершено: 0%
								</div>
								<div className="progres-bar-tests">
									<div className="progress-wrapper">
										<svg viewBox="0 0 36 36" className="circular-chart orange">
											
											<path className="circle-bg"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
											
											<path className="circle"
											      d="M18 2.0845
								         a 15.9155 15.9155 0 0 1 0 31.831
								         a 15.9155 15.9155 0 0 1 0 -31.831"/>
										</svg>
										
										<div className="percentage">70%</div>
									</div>
								</div>
							</div>
							<div className="div-btn-progres-test">
								<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
								<button className="btn-progres-test-two"><img src="img/a-large-small.svg" />Вивчити слова</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<section className="full-dostup">
				<div className="div-ful-dostup">
					<h3 className="ful-dostup">Хочеш отримати повний доступ?</h3>
					<div className="div-btn-progres">
						<button className="btn-progres-test"><img src="img/lock.svg" />Почати урок</button>
					</div>
				</div>
			</section>
		</>
	);
}
