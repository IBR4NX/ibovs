'use client';
// import { InteractiveGridBackground } from "@/components/animation/interactive-grid-background";
import GlowingButton from '@/ibovs/ui/glow-border-button';
import HoverButton from '@/ibovs/ui/hover-button';
import { motion } from 'motion/react';
import { StarsBackground } from '@/components/animation/stars';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import fonts from '@/components/styles/fonts';
import { ThemeToggle } from '@/comp/shared/toggles/themeToggle';
import { useState, useEffect } from 'react';
import cn from '@cn';
import { ColorToggle, ModeToggle } from "@/components/shared/toggles/themeToggle";

function InteractiveHero() {
	const [loading, setLoading] = useState(true);
	const { resolvedTheme } = useTheme();
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 0);
		return () => clearTimeout(timer);
	}, []);
	if (loading) return null;
	//console.log(resolvedTheme);
	return (
		<>
			<div className=' flex gap-2 absolute z-50 top-4 left-4'>
				<ColorToggle />
				<ModeToggle />
			</div>
			<StarsBackground
				starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
				className={'absolute inset-0 flex items-center justify-center rounded-xl -z-10 bg-none '}
			/>
			<div className=' fixed inset-0 flex flex-col items-center justify-center h-full pointer-events-none px-4'>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: 'easeOut' }}
					className=' -mt-20 gap-5 flex flex-col items-center'
				>
					<h1
						className={cn(
							fonts.arefRuqaa.className,
							'text-4xl md:text-6xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-linear-to-b dark:from-white dark:to-white/50 from-black to-black/50'
						)}
					>
						المتجر الإحترافي
					</h1>
					<h3
						className={cn(
							fonts.amiri.className,
							'text-2xl md:text-3xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-linear-to-b dark:from-white dark:to-white/50 from-black to-black/50'
						)}
					>
						تجارتك على السوشيال ميديا... الآن لها مقر رسمي.
					</h3>
					<p
						className={cn(
							fonts.amiri.className,
							'mt-6 text-sm md:text-lg dark:text-white/70  max-w-xl text-center leading-relaxed'
						)}
					>
						حوّل فوضى الرسائل إلى المتجر احترافي. بـ نقرة واحدة، امنح زبائنك تجربة تسوق منظمة، واحصل على رابط خاص بمتجرك
						يوضع في البايو.
					</p>

					<div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto'>
						<GlowingButton>استكشف المتاجر القريبة منك</GlowingButton>


						<div className='flex w-full shrink-0 gap-4 justify-center mx-auto'>
							<Link href='login'>
								<GlowingButton>login</GlowingButton>
							</Link>
							<Link href='signup'>
								<GlowingButton>signup</GlowingButton>
							</Link>
						</div>

					</div>
				</motion.div>
				<div className='absolute bottom-4 text-center text-sm text-muted-foreground'>
					<p className='text-center text-sm text-muted-foreground'>
						© 2024 Ibrahim Dabwan . All rights reserved.
					</p>
				</div>
			</div>
		</>
	);
}
export default InteractiveHero;