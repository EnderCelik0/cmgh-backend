import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckboxWithText } from './ProductEditor';
import { Button } from '../ui/button';

export default function OptionProperties() {
	return (
		<div className='flex flex-col justify-between border-2 border-[#c3c3c3] rounded-md p-3 h-full'>
			<div className='flex flex-col gap-4'>
				<h3>Option Properties</h3>
				<div className='flex flex-col'>
					<h4 className='text-base'>User-Friendly Name</h4>
					<Input className='border border-[#c3c3c3]' />
				</div>
				<div className='flex flex-col'>
					<h4 className='text-base'>Full Summary Name</h4>
					<Input className='border border-[#c3c3c3]' />
				</div>
				<img
					// className='w-48 h-24'
					className='w-48 h-24 object-cover'
					src='src\assets\thumbnail_placeholder\thumbnail_placeholder.png'
					alt='placeholder'
				/>
				<SelectWithLabel />
				<CheckboxWithText labelText='Available by Default' />
				<CheckboxWithText labelText='Has Quantity Control' />

				<TextareaWithLabel />
				<CheckboxWithText labelText='Disabled' />
			</div>

			<div className='flex justify-end w-full gap-4'>
				<Button>Duplicate</Button>
				<Button>Save</Button>
				<Button>Delete</Button>
			</div>
		</div>
	);
}

function TextareaWithLabel() {
	return (
		<div className='grid w-full gap-1.5'>
			<Label htmlFor='path'>Image Path</Label>
			<Textarea
				className='min-h-10 border border-[#c3c3c3]'
				placeholder='Type your path here.'
				id='path'
			/>
		</div>
	);
}

function SelectWithLabel() {
	return (
		<div className='flex flex-col'>
			<h4 className='text-base'>Thumbnail Size</h4>
			<Select>
				<SelectTrigger className='w-[180px] border border-[#c3c3c3]'>
					<SelectValue placeholder='Select Thumbnail Size' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='1x1'>1 x 1</SelectItem>
					<SelectItem value='2x1'>2 x 1</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
