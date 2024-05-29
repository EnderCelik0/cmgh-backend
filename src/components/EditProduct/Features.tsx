import { useState } from 'react';
import { Button } from '../ui/button';

export default function Features({
	features,
}: {
	features: { name: string; value: string }[];
}) {
	const [activeFeature, setActiveFeature] = useState<string | null>(null);

	async function addFeature() {
		await fetch('http://localhost:3000/number_sequence').then((res) =>
			res.json().then((data) => console.log(data))
		);
	}

	return (
		<div className='w-full flex flex-col border-2 border-[#c3c3c3] rounded-md p-2'>
			<h3 className='mb-4 text-base'>Product Features:</h3>
			<div className='h-[600px] overflow-auto p-1'>
				<div className='flex flex-col'>
					{features.map((item) => (
						<Feature
							key={item.name}
							feature={item.value}
							isActive={activeFeature === item.value}
							onClick={() => setActiveFeature(item.value)}
						/>
					))}
				</div>
			</div>
			<Button
				className='self-start bg-[#cecece] text-black px-4 mt-3 hover:bg-slate-400'
				onClick={addFeature}
			>
				Add Feature
			</Button>
		</div>
	);
}

function Feature({
	feature,
	isActive,
	onClick,
}: {
	feature: string;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<Button
			className={`flex justify-center ${
				isActive ? 'bg-accent' : 'bg-background'
			} border border-blue-500 rounded-md  py-[6px] text-black  text-base font-medium transition-colors duration-150  hover:bg-accent hover:cursor-pointer disabled:text-white disabled:bg-blue-400`}
			onClick={onClick}
		>
			{feature}
		</Button>
	);
}
