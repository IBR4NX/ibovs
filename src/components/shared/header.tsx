"use client";
import { cn } from "@cn";
import React from "react";
import { ColorToggle, ModeToggle } from "./toggles/themeToggle";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import SideTrigger from "./toggles/side-trigger";
export function Header({ children, className }: React.ComponentProps<"div">) {
	const [isTop, setIsTop] = React.useState(true);
	const { scrollY, scrollYProgress } = useScroll();
	const [hidden, setHidden] = React.useState(false);

	useMotionValueEvent(scrollY, "change", current => {
		const previous = scrollY.getPrevious() ?? 0;
		console.log(current - previous);
		if (current > previous && current > 500) {
			setHidden(true);
		} else if (hidden) {
			setHidden(false);
		}
		if (!isTop && current < 10) {
			setIsTop(true);
		} else if (isTop && current > 10) {
			setIsTop(false);
		}
	});

	return (
		<div className=" relative ab min-h-14">
			<motion.header
				className={cn(
					"bg-card fixed z-20 top-0 inset-x-0 flex shrink-0 items-center gap-2 border-b  p-2   ",
					className,
					!isTop && "drop-shadow-md/25",
					"drop-shadow-foreground",
				)}
				onClick={()=>setHidden(false)}
				animate={{
					y: hidden ? -50.7 : 0,
					//opacity: hidden ? 0 : 1,
				}}
				transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
				//{...props}
			>
				<SideTrigger />
				{children}
				<div className="mr-auto flex gap-1 items-center ">
					<ColorToggle />
					<ModeToggle />
				</div>
				<motion.div
					id="scroll-indicator"
					style={{
						scaleX: scrollYProgress,
						bottom: -1,
						left: 0,
						right: 0,
						height: 2,
						originX: 0,
					}}
					className={cn(" absolute bg-primary z-10 ")}
					onClick={()=>setHidden(false)}
				/>
			</motion.header>
		</div>
	);
}
