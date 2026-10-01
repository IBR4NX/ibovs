
import { MonitorCog, Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React from 'react';

export function ThemeToggle() {
	const [loading, setLoading] = React.useState(true);
	const { setTheme, themes, resolvedTheme } = useTheme();
	React.useEffect(() => {
		setLoading(false);
	}, []);
	if (loading) return null;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<>
						<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
						<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
						<span className='sr-only'>Toggle theme</span>
					</>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{themes.map(theme => (
					<DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
						{theme}
					</DropdownMenuItem>
				))}
</DropdownMenuContent>
		</DropdownMenu>
	);
}

export const ModeToggle = () => {
	const [loading, setLoading] = React.useState(true);
	const { setTheme, themes, theme } = useTheme();
	// const index = themes.indexOf(theme||"li")
	// console.log(themes[index+1])
	const handleToggle = () => {
		const currentTheme = themes.indexOf(theme || 'light');
		const nextTheme = (currentTheme + 1) % themes.length;
		console.log(nextTheme);
		setTheme(themes[nextTheme]);
	};
	React.useEffect(() => {
		setLoading(false);
	}, []);
	if (loading) return null;

	return (
		<div>
			<Button onClick={handleToggle} variant='outline' size='icon'>
				<>{theme === 'system' ? <MonitorCog /> : theme === 'dark' ? <Sun /> : <Moon />}</>
			</Button>
		</div>
	);
};


type ColorTheme = 'blue' | 'yellow' | 'red';
const colors: ColorTheme[] = ['blue', 'yellow', 'red'];

const isColorTheme = (value: string): value is ColorTheme =>
	colors.includes(value as ColorTheme);

export function ColorToggle() {
	const [loading, setLoading] = React.useState(true);
	const [color, setColor] = React.useState<ColorTheme>('blue');
	React.useEffect(() => {
		setLoading(false);
		const storedColor = localStorage.getItem('color');
		if (storedColor && isColorTheme(storedColor)) {
			setColor(storedColor);
			document.documentElement.classList.add(`theme-${storedColor}`);
		}
	}, []);
	if (loading) return null;
	function setTheme(theme: ColorTheme) {
		const html = document.documentElement;
		html.classList.remove('theme-blue', 'theme-yellow', 'theme-red');
		html.classList.add(`theme-${theme}`);
		localStorage.setItem('color', theme);
		setColor(theme);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='secondary' size='icon'>
					<>
						<Palette className='h-[1.2rem] w-[1.2rem]' />
					</>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{colors.map(color => (
					<DropdownMenuItem key={color} onClick={() => setTheme(color)}>
						{color}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default ModeToggle;
