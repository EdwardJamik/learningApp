import '../../../../styles/lesons.css'
import '../../../components/Header/header.scss'

export default function Home() {
	return (
		<>
			<section className="storinka-title">
				<div className="title-div-one">
					<div className="title-div-two">
						<h1 className="title-page-h1">Всі рівні</h1>
					</div>
				</div>
			</section>
			
			<section className="section-lesons">
				<div className="div-lesons">
					<div className="grid-lesons">
						<div className="leson fon">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">A0</h2>
									<div className="tooltip">
										{/*<img style="display: none;" src="/img/Frame711.svg" alt="icon" width="30"/>*/}
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Beginner</h3>
								Ви починаєте вивчати англійську мову та знаєте лише кілька слів або виразів
							</div>
							<div className="icon-leson">
								<img src="/img/0fa8cd2c4074376135137f539245219b88cb13ad.png"/>
							</div>
						</div>
						<div className="leson">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">A1</h2>
									<div className="tooltip">
										<img src="/img/Frame711.svg" alt="icon" width="30"/>
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Elementary</h3>
								Ви можете прості слова та повсякденні фрази, щоб розповісти про себе та своє оточення
							</div>
							<div className="icon-leson">
								<img src="/img/818089bd0642402dbfc99bd9e07dfe7408134ba1.png"/>
							</div>
						</div>
						<div className="leson">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">A2</h2>
									<div className="tooltip">
										{/*<img style="display: none;" src="/img/Frame711.svg" alt="icon" width="30"/>*/}
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Pre-Intermediate</h3>
								Ви можете спілкуватися у простих та рутинних завданнях і говорити на знайомі теми
							</div>
							<div className="icon-leson">
								<img src="/img/64be84e1c4d64198944da474dc0942f615dacdcf.png"/>
							</div>
						</div>
						<div className="leson fon">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">B1</h2>
									<div className="tooltip">
										{/*<img style="display: none;" src="/img/Frame711.svg" alt="icon" width="30"/>*/}
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Intermediate</h3>
								Ви можете розуміти основні моменти чіткої стандартної мови та висловлюватися у знайомих ситуаціях
							</div>
							<div className="icon-leson">
								<img src="/img/9c5abd2337069ec371218326c653dae079acba20.png"/>
							</div>
						</div>
						<div className="leson fon">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">B2</h2>
									<div className="tooltip">
										{/*<img style="display: none;" src="/img/Frame711.svg" alt="icon" width="30"/>*/}
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Upper-Intermediate</h3>
								Ви можете вільно спілкуватися з носіями мови та розуміти складні тексти на різні теми
							</div>
							<div className="icon-leson">
								<img src="/img/f88c5e9b7939ef5b4469403d35ecd75fcfb795de.png"/>
							</div>
						</div>
						<div className="leson">
							<div className="info-leson">
								<div className="zagolovok-leson-div">
									<h2 className="zagolovok-leson">C1</h2>
									<div className="tooltip">
										{/*<img style="display: none;" src="/img/Frame711.svg" alt="icon" width="30"/>*/}
										<div className="tooltiptext">
											Ви перебуваєте <br/> зараз на цьому рівні
										</div>
									</div>
								</div>
								<h3 className="pidzagolovok-leson">Advanced</h3>
								Ви можете говорити природно, розуміти складні ідеї та чітко висловлювати думку в різних ситуаціях.
							</div>
							<div className="icon-leson">
								<img src="/img/7862c7859dd866cc7151a6497d2da60fad89bdea.png" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
