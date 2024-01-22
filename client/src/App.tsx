import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SatelliteListProvider } from './context/SatelliteContext';
import SatelliteDetail from './pages/SatelliteDetail';
import SatelliteForm from './pages/SatelliteForm';
import SatelliteList from './pages/SatelliteList';
import Satellites from './pages/Satellites';
import SimpleMap from './simple-map/SimpleMap';

function App() {
  return (
    <Router>
      <SatelliteListProvider>
        <div className='flex h-full flex-col items-start text-xs'>
          <div className='w-full grow overflow-y-hidden overflow-x-scroll bg-gray-500 text-center'>
            <SimpleMap />
          </div>
          <div className='flex max-h-[280px] min-h-[280px] w-full flex-col items-start gap-1 border-t border-t-black p-1 '>
            <Routes>
              <Route path='/new' element={<SatelliteForm />} />
              <Route path='/' element={<Satellites />}>
                <Route index element={<SatelliteList />} />
                <Route path=':id' element={<SatelliteDetail />} />
                <Route path=':id/edit' element={<SatelliteForm />} />
              </Route>
            </Routes>
          </div>
        </div>
      </SatelliteListProvider>
    </Router>
  );
}

export default App;
