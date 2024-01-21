import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SatelliteListProvider } from './context/SatelliteContext';
import CreateSatelliteForm from './pages/CreateSatelliteForm';
import SatelliteDetail from './pages/SatelliteDetail';
import SatelliteList from './pages/SatelliteList';
import Satellites from './pages/Satellites';
import UpdateSatelliteForm from './pages/UpdateSatelliteForm';
import SimpleMap from './simple-map/SimpleMap';

function App() {
  return (
    <Router>
      <SatelliteListProvider>
        <div className='flex h-full flex-col items-start text-xs'>
          <div className='w-full grow overflow-y-hidden overflow-x-scroll bg-gray-500 text-center'>
            <SimpleMap />
          </div>
          <div className='flex max-h-[280px] min-h-[280px] w-full flex-row flex-col items-start gap-1 border-t border-t-black p-1 '>
            <Routes>
              <Route path='/new' element={<CreateSatelliteForm />} />
              <Route path='/' element={<Satellites />}>
                <Route index element={<SatelliteList />} />
                <Route path=':id' element={<SatelliteDetail />} />
                <Route path=':id/edit' element={<UpdateSatelliteForm />} />
              </Route>
            </Routes>
          </div>
        </div>
      </SatelliteListProvider>
    </Router>
  );
}

export default App;
