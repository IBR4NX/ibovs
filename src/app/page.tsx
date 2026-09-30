import InteractiveHero from '@/ibovs/interactive-hero';
import wait from '@/utils/wait'
export default async function Home() {
  await wait(60)
	return (
		<>
		<InteractiveHero />
		</>
		);
  
}
