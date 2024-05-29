import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProductEditor() {
	return (
		<section className='flex flex-col gap-2 border-2 border-[#c3c3c3]/80 p-3 rounded-md'>
			<div className='flex gap-20'>
				<h1>Edit Product:</h1>
				<SelectProductDropdown />
			</div>

			<div className='flex flex-col'>
				<h4 className='text-base'>Product Name</h4>
				<Input className='border border-[#c3c3c3]' />
			</div>

			<div className='flex justify-between'>
				<CheckboxWithText labelText='Disabled' />
				<div className='flex gap-4'>
					<Button className='bg-[#cfcfcf] text-base text-black rounded-md px-4 py-1 hover:bg-[#cfcfcf]/70 hover:border-black '>
						Save
					</Button>
					<Button className='bg-[#cfcfcf] text-base text-black rounded-md px-4 py-1 hover:bg-[#cfcfcf]/70 hover:border-black '>
						Delete
					</Button>
				</div>
			</div>
		</section>
	);
}

function SelectProductDropdown() {
	return (
		<Select>
			<SelectTrigger className='w-[180px] border border-[#c3c3c3]'>
				<SelectValue placeholder='Product' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='table'>Table Display</SelectItem>
				<SelectItem value='newProduct'>[Add New Product]</SelectItem>
				<SelectItem value='showAllFeatures'>[Show All Features]</SelectItem>
			</SelectContent>
		</Select>
	);
}

export function CheckboxWithText({ labelText }: { labelText: string }) {
	return (
		<div className='flex items-center space-x-2'>
			<input
				className=' peer h-6 w-6 border border-[#c3c3c3]  text-accent-500 focus:ring-accent-500'
				type='checkbox'
				id='isDisabled'
			/>

			<label
				htmlFor='isDisabled'
				className='text-lg font-ligh leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
			>
				{labelText}
			</label>
		</div>
	);
}
