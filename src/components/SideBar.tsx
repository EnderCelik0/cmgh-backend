import { Button } from '@/components/ui/button';
import { useAppContext } from '../context/AppContext';

export default function Sidebar() {
	const { page, handlePage } = useAppContext();

	return (
		<aside className='bg-slate-750 h-full w-48 p-3 flex flex-col shadow-lg border-r-[1px] rounded-lg '>
			<section>
				<Button
					className={`block w-full p-2 mb-4 text-left hover:bg-accent  ${
						page === 'products' && 'bg-accent'
					}`}
					onClick={() => handlePage('products')}
				>
					Edit Products
				</Button>
			</section>
			<section>
				<Button
					className={`block w-full p-2 mb-4 text-left hover:bg-accent ${
						page === 'rules' && 'bg-accent'
					}`}
					onClick={() => handlePage('rules')}
				>
					Edit Rules
				</Button>
			</section>
			<section className='mt-auto'>
				<Button
					className={`block w-full p-2  text-left hover:bg-accent ${
						page === 'settings' && 'bg-accent'
					}`}
					onClick={() => handlePage('settings')}
				>
					Settings
				</Button>
			</section>
		</aside>
	);
}
