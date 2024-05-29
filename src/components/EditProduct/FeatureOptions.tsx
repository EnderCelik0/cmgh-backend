import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface Option {
	option_id: number;
	option_name: string;
	user_friendly_option_name: string;
	full_summary_name: string;
	thumbnail_size: string;
	available_default: boolean;
	has_quantity_control: boolean;
	option_img: string;
	disabled: boolean;
}

interface OptionGroup {
	option_group_id: number;
	option_group_name: string;
	options: Option[];
}

interface FeatureData {
	feature_id: number;
	feature_name: string;
	user_friendly_feature_name: string;
	unique_name: string;
	available_default: boolean;
	feature_description: string;
	disabled: boolean;
	feature_option_groups: OptionGroup[];
}

export default function FeatureOptions() {
	const [data, setData] = useState<FeatureData | null>(null);
	const [activeOption, setActiveOption] = useState<number | null>(null);

	function getOptionGroups() {
		fetch('http://localhost:3000/number_sequence').then((res) =>
			res.json().then((data: FeatureData) => setData(data))
		);
	}

	useEffect(() => {
		getOptionGroups();
	}, []);

	const handleOptionClick = (optionId: number) => {
		setActiveOption(optionId === activeOption ? null : optionId);
	};

	return (
		<div>
			<div className='flex flex-col justify-between gap-6 border-2 border-[#c3c3c3] rounded-md p-2 h-full'>
				{data ? (
					<div>
						<h3>Options for {data.user_friendly_feature_name}</h3>
						{data.feature_option_groups.map((group) => (
							<fieldset
								key={group.option_group_id}
								className='grid grid-cols-[min-content_2fr] gap-6 border-2 p-2 border-[#70ad47] '
							>
								<legend className='text-base px-1'>
									{group.option_group_name}
								</legend>
								{group.options.map((option) => (
									<div
										key={option.option_id}
										className={`flex items-end justify-center border border-transparent text-center text-lg font-medium break-words   ${
											activeOption === option.option_id
												? 'bg-accent border-black'
												: 'bg-[#b7d6a3]'
										} w-52 h-24 pb-3 transition-colors duration-250 hover:border-black cursor-pointer hover:bg-accent`}
										onClick={() => handleOptionClick(option.option_id)}
									>
										<span>{option.user_friendly_option_name}</span>
									</div>
								))}
							</fieldset>
						))}
					</div>
				) : (
					<p>Loading...</p>
				)}
				<div className='flex justify-end w-full gap-4'>
					<Button>Duplicate</Button>
					<Button>Save</Button>
					<Button>Delete</Button>
				</div>
			</div>
		</div>
	);
}
