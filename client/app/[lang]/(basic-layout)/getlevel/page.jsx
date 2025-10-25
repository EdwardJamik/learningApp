"use client"

import '../../../components/Header/header.scss';
import './test.scss';
import Link from 'next/link'
import Image from 'next/image'
import getLevelImage from "../../../assets/GetLevel/testlevel.png";
import {useState} from 'react'
import TestResultModal from '@/app/components/Modal/TestResultModal'
import {useAuth} from '@/context/AuthContext'
import {useTranslation} from '@/context/TranslationProvider'
import {useRouter} from 'next/navigation'


export default function Account() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userLevel, setUserLevel] = useState('');
	const { checkAuth,user } = useAuth();
	const { locale } = useTranslation();
	const router = useRouter();
	
	if(user?.level){
		return router.push('/dashboard');
	}
	
	return (
		<>
			
			<section className="test-level-section">
				<div className="test-level-div">
					<div className="test-level-flex">
						<div className="level-one-div">
							<h1 className="zagolovok-test-level">Визначити свій рівень</h1>
							<div className="flex-text-level">
								<div className="icon-and-text">
									<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect y="0.5" width="45" height="40" rx="12" fill="#FE502D"/>
										<path
											d="M26 20.5H32M26 14.5H32M14 21.5L17.553 13.776C17.5946 13.693 17.6584 13.6233 17.7373 13.5745C17.8163 13.5258 17.9072 13.5 18 13.5C18.0928 13.5 18.1837 13.5258 18.2627 13.5745C18.3416 13.6233 18.4054 13.693 18.447 13.776L22 21.5M14 26.5H32M14.92 19.5H21.08"
											stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
									
									<div className="punct-level"><strong>Vocabulary:</strong> articles, pronouns, prepositions, common expressions (A1 → C1)</div>
								</div>
								<div className="icon-and-text">
									<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect y="0.5" width="45" height="40" rx="12" fill="#FE502D"/>
										<path
											d="M23.9999 29.4999H31.9999M25.9999 13.4999L29.9999 17.4999M32.1739 15.3119C32.7026 14.7833 32.9997 14.0664 32.9998 13.3187C32.9999 12.5711 32.703 11.8541 32.1744 11.3254C31.6459 10.7967 30.9289 10.4996 30.1813 10.4995C29.4337 10.4994 28.7166 10.7963 28.1879 11.3249L14.8419 24.6739C14.6098 24.9054 14.438 25.1904 14.3419 25.5039L13.0209 29.8559C12.9951 29.9424 12.9931 30.0342 13.0153 30.1217C13.0374 30.2092 13.0829 30.2891 13.1467 30.3529C13.2106 30.4167 13.2906 30.462 13.3781 30.484C13.4656 30.506 13.5575 30.5039 13.6439 30.4779L17.9969 29.1579C18.3101 29.0626 18.5951 28.892 18.8269 28.6609L32.1739 15.3119Z"
											stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
									
									<div className="punct-level"><strong>Grammar:</strong> verb tenses, modals, pronouns, complex structures (A1 → C1)</div>
								</div>
								<div className="icon-and-text">
									<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect y="0.5" width="45" height="40" rx="12" fill="#FE502D"/>
										<path
											d="M23 29.5V15.5M23 29.5C23 28.7044 22.6839 27.9413 22.1213 27.3787C21.5587 26.8161 20.7956 26.5 20 26.5H14C13.7348 26.5 13.4804 26.3946 13.2929 26.2071C13.1054 26.0196 13 25.7652 13 25.5V12.5C13 12.2348 13.1054 11.9804 13.2929 11.7929C13.4804 11.6054 13.7348 11.5 14 11.5H19C20.0609 11.5 21.0783 11.9214 21.8284 12.6716C22.5786 13.4217 23 14.4391 23 15.5M23 29.5C23 28.7044 23.3161 27.9413 23.8787 27.3787C24.4413 26.8161 25.2044 26.5 26 26.5H32C32.2652 26.5 32.5196 26.3946 32.7071 26.2071C32.8946 26.0196 33 25.7652 33 25.5V24.2M23 15.5C23 14.4391 23.4214 13.4217 24.1716 12.6716C24.9217 11.9214 25.9391 11.5 27 11.5H32C32.2652 11.5 32.5196 11.6054 32.7071 11.7929C32.8946 11.9804 33 12.2348 33 12.5V14.5M27 20.5L29 22.5L33 18.5"
											stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
									
									<div className="punct-level"><strong>Reading / Comprehension:</strong> short and medium texts, understanding events, reasons, intentions (A1 → C1)</div>
								</div>
							</div>
							<div className="btns-level-test">
								
								<Link href={`/${locale !== 'ru' ? 'level_test' : 'ru/level_test'}`}
								 className="test-levt-btn">Розпочати тест
								</Link>
								<Link href={`/${locale !== 'ru' ? 'lesson/my-level' : 'ru/lesson/my-level'}`} className="test-lev-btn">Я знаю свій рівень</Link>
							</div>
						</div>
						<div className="level-two-div">
							<div className="img-level-test">
								<Image src={getLevelImage} alt='Level test'/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<TestResultModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				level={userLevel}
			/>
		</>
	);
}
