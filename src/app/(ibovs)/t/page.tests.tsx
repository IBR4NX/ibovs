import React from 'react';
//import style from './style/style.module.css';

export default function Page() {
	return (
		<>
		<div >
			<div className='w-full bg-amber-10  gap-1 relative flex'>
				<svg 
				className="spinCircle *: animagte-spin fill-amber-300 stroke-amber-600 " 
				width='20' height='20' viewBox='0 0 220 220'>
					<circle
						cx='110'
						 cy='110'
						r='90'
						fill='none'
						stroke='oratnge'
						strokeWidth='10'
						strokeDasharray='250 565'
						strokeDashoffset='0'
					/>
				</svg>
				<svg className='absolute  z-20 opacity-0' width='220' height='220' viewBox='0 0 220 220'>
					<defs>
						<linearGradient id='grad' x1='0' y1='0' x2='220' y2='220'>
							<stop offset='0%' stopColor='red' />
							<stop offset='25%' stopColor='orange' />
							<stop offset='50%' stopColor='yellow' />
							<stop offset='75%' stopColor='green' />
							<stop offset='100%' stopColor='blue' />
						</linearGradient>
					</defs>
					<circle cx='110' cy='110' r='90' fill='none' stroke='url(#grad)' strokeWidth='5' strokeDasharray='200 365' />
				</svg>
			</div>


			<svg width='220' height='220' viewBox='0 0 220 220'>
				<defs>
					<linearGradient id='grad' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='220' y2='220'>
						<stop offset='0%' stopColor='red' />
						<stop offset='25%' stopColor='orange' />
						<stop offset='50%' stopColor='yellow' />
						<stop offset='75%' stopColor='green' />
						<stop offset='100%' stopColor='blue' />
					</linearGradient>
				</defs>

				<path
					d='M110 110
       m-5 0
       a5 5 0 1 1 10 0
       a10 10 0 1 1 -20 0
       a15 15 0 1 1 30 0
       a20 20 0 1 1 -40 0
       a25 25 0 1 1 50 0
       a30 30 0 1 1 -60 0
       a35 35 0 1 1 70 0'
					fill='none'
					stroke='url(#grad)'
					strokeWidth='5'
				/>
			</svg>
			</div>
		</>
	);
}