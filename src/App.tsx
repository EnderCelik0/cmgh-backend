import Sidebar from './components/SideBar';
import EditProduct from './pages/Product';
import EditRules from './pages/EditRules';
import Settings from './pages/Settings';
import { useAppContext } from './context/AppContext';

const App = () => {
	const { page } = useAppContext();

	const renderSelectedComponent = () => {
		switch (page) {
			case 'products':
				return <EditProduct />;
			case 'rules':
				return <EditRules />;
			case 'settings':
				return <Settings />;
			default:
				return null;
		}
	};

	return (
		<div className='flex gap-10 h-dvh bg-slate-100'>
			<Sidebar />
			<div className='py-2 bg-slate-100'>{renderSelectedComponent()}</div>
		</div>
	);
};

export default App;
