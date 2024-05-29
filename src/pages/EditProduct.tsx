import ProductEditor from '../components/EditProduct/ProductEditor';
import Features from '@/components/EditProduct/Features';
import items from '../data/features.json';
import FeatureOptions from '@/components/EditProduct/FeatureOptions';
import FeatureProperties from '@/components/EditProduct/FeatureProperties';
import OptionProperties from '@/components/EditProduct/OptionProperties';

export default function EditProduct() {
	return (
		<main className='flex gap-6 text-2xl'>
			<section className='flex flex-col gap-2'>
				<ProductEditor />
				<Features features={items} />
			</section>
			<FeatureOptions />
			<div>
				{/* <FeatureProperties /> */}
				{/* <OptionProperties /> */}
			</div>
		</main>
	);
}
