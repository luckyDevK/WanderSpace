import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Home from './pages/Home';
import PlaceContextProvider from './context/PlaceContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PlaceContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </PlaceContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
