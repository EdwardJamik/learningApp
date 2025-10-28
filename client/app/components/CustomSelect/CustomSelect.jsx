'use client';
import { useState, useRef, useEffect } from 'react';
import './customSelect.scss';

const CLOSE_DELAY = 120; // ms — невелика затримка щоб уникнути флікера

const CustomSelect = ({ options = [], value, onChange, disabled }) => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);
	const closeTimeout = useRef(null);
	
	const handleSelect = (optionIndex) => {
		onChange(optionIndex);
		setOpen(false);
	};
	
	const handlePointerEnter = () => {
		if (closeTimeout.current) {
			clearTimeout(closeTimeout.current);
			closeTimeout.current = null;
		}
	};
	
	const handlePointerLeave = () => {
		if (closeTimeout.current) clearTimeout(closeTimeout.current);
		closeTimeout.current = setTimeout(() => {
			setOpen(false);
			closeTimeout.current = null;
		}, CLOSE_DELAY);
	};
	
	useEffect(() => {
		const onDocClick = (e) => {
			if (!wrapperRef.current) return;
			if (!wrapperRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		
		document.addEventListener('mousedown', onDocClick);
		return () => {
			document.removeEventListener('mousedown', onDocClick);
		};
	}, []);
	
	useEffect(() => {
		return () => {
			if (closeTimeout.current) clearTimeout(closeTimeout.current);
		};
	}, []);
	
	return (
		<div
			ref={wrapperRef}
			className={`custom-select ${disabled ? 'disabled' : ''}`}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			tabIndex={0}
		>
			<div
				className="selected"
				onClick={() => !disabled && setOpen(prev => !prev)}
				aria-expanded={open}
				role="button"
			>
				{value !== null && value !== undefined ? (
					// якщо опція — об'єкт, показуємо бажане поле
					typeof options[value] === 'object'
						? options[value].text ?? options[value].label ?? String(options[value])
						: options[value]
				) : (
					''
				)}
			</div>
			
			{open && (
				<div className="dropdown" role="listbox">
					{options.map((opt, idx) => (
						<div
							key={idx}
							className="option"
							role="option"
							onClick={() => handleSelect(idx)}
						>
							{typeof opt === 'object' ? opt.text ?? opt.label ?? String(opt) : opt}
						</div>
					))}
				
				</div>
			)}
			{/*<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">*/}
			{/*	<path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
			{/*</svg>*/}
		</div>
	);
};

export default CustomSelect;
