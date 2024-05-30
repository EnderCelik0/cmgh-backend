export default function Loader() {
	return (
		<svg
			className='w-16 h-16 animate-spin'
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				className='text-black opacity-20'
				cx='20'
				cy='20'
				r='17.5'
				stroke='currentColor'
				strokeWidth='2px'
			/>
			<circle
				className='text-black stroke-current '
				cx='20'
				cy='20'
				r='17.5'
				stroke='currentColor'
				strokeWidth='2px'
				strokeLinecap='round'
				strokeDasharray='25 75'
				transform='rotate(90 20 20)'
			/>
		</svg>
	);
}
