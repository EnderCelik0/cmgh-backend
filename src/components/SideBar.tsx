export default function SideBar() {
	return (
		<div className='w-64 bg-slate-500 h-full flex flex-col items-center'>
			<div className='text-2xl font-medium mt-4'>Admin Panel</div>
			<div className='flex flex-col items-center mt-4'>
				<div className='text-lg font-medium'>Products</div>
				<div className='text-lg font-medium'>Rules</div>
			</div>
		</div>
	);
}
