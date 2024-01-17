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
        <div className='flex h-full flex-row items-start text-xs'>
          <div className='flex h-full w-[280px] min-w-[280px] max-w-[280px] flex-col items-start gap-1 border-r border-r-black p-1 '>
            <Routes>
              <Route path='/new' element={<CreateSatelliteForm />} />
              <Route path='/' element={<Satellites />}>
                <Route index element={<SatelliteList />} />
                <Route path=':id' element={<SatelliteDetail />} />
                <Route path=':id/edit' element={<UpdateSatelliteForm />} />
              </Route>
            </Routes>
          </div>
          <div className='flex h-full grow flex-col items-stretch'>
            <SimpleMap />
            <div className='grow self-stretch border-t border-t-black p-1'>
              Use breadcrumb (top left) to return to the satellite list
              <br />A two finger drag zooms the map
            </div>
          </div>
        </div>
      </SatelliteListProvider>
    </Router>
  );
}

export default App;
