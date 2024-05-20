import SideBar from './components/SideBar.js';
import EditProduct from './pages/EditProduct.jsx';
import EditRules from './pages/EditRules.jsx';

function App() {
	return (
		<div className='min-h-dvh bg-slate-400 relative'>
			<SideBar/>
			<EditProduct />
			<EditRules />
		</div>
	);
}

export default App;
