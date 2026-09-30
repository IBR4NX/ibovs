"use client";
// import { InteractiveGridBackground } from "@/components/animation/interactive-grid-background";
import GlowingButton from "@/ui/glow-border-button";
import HoverButton from "@/ui/hover-button";
import { motion } from "motion/react";
import { StarsBackground } from "@/components/animation/stars";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-provider";
function InteractiveHero() {
  const { resolvedTheme } = useTheme();
  return (
    <>
    <StarsBackground
        starColor={resolvedTheme === "dark" ? "#FFF" : "#000"}
        className={"absolute inset-0 flex items-center justify-center rounded-xl -z-10 bg-none "}
        />
      <div className=" fixed inset-0 flex flex-col items-center justify-center h-full pointer-events-none px-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className=" -mt-20 gap-5 flex flex-col items-center"
        >
        
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-linear-to-b dark:from-white dark:to-white/50 from-black to-black/50">
            المتجر الإحترافي
          </h1>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-linear-to-b dark:from-white dark:to-white/50 from-black to-black/50">
            تجارتك على السوشيال ميديا... الآن لها مقر رسمي.
          </h3>
          <p className="mt-6 text-sm md:text-lg dark:text-white/70  max-w-xl text-center leading-relaxed">
            حوّل فوضى الرسائل إلى المتجر  احترافي. بـ نقرة واحدة، امنح زبائنك تجربة تسوق منظمة، واحصل على رابط خاص بمتجرك يوضع في البايو.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 pointer-events-auto">
            <GlowingButton>
              استكشف المتاجر القريبة منك
            </GlowingButton>
           
           <div>
              <Link href='dashboard' >
            <HoverButton className=" w-full" >
              إدارة المتجر  
            </HoverButton>
              </Link>
              <Link href='register' >
            <HoverButton className=" w-full" >
              ابدأ متجرك مجاناً 
            </HoverButton>
              </Link>
           </div>
              
              <div className="flex w-full shrink-0  justify-center mx-auto">
            <Link href='login' >
            <GlowingButton>login</GlowingButton>
            </Link>
            <Link href='signup' >
              <GlowingButton>
                signup
              </GlowingButton>
            </Link>
            
              </div>
              <div className=" absolute z-50 top-2 left-2">
                      <ThemeToggle/>
                  </div>
          </div>
        </motion.div>
      </div>
          {/* InteractiveGridBackground ⇣ */}
          <>
          {/* <InteractiveGridBackground
          color="#ffffff00"
          highlightColor={resolvedTheme === "dark" ? "#FFFFFF50" : "#00000052"}
          dotSize={0.1}
          radius={100}
          gridGap={20}
          className="h-screen fixed top-0 left-0 bg-none  w-full">
          </InteractiveGridBackground>  */}
          </>
    </>
  );
}
export default InteractiveHero
