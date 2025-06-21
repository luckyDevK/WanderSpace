import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PlaceContextProvider from './context/PlaceContext';

function App() {
  return (
    <>
      <PlaceContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PlaceContextProvider>
    </>
  );
}

export default App;
