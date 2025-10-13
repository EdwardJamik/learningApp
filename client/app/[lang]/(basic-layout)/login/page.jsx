'use client';

import './login.scss'
import { useState } from 'react'
import RegForm from '@/app/components/RegForm/RegForm'
import LoginForm from '@/app/components/LoginForm/LoginForm'

export default function Login() {
	const [isLogin, setIsLogin] = useState(false)
	
	const toggleForm = () => setIsLogin(prev => !prev)
	
	return (
		<>
			{isLogin
				? <RegForm toggleForm={toggleForm} />
				: <LoginForm toggleForm={toggleForm} />
			}
		</>
	);
}
