import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Home from './pages/Home';
import PlaceContextProvider from './context/PlaceContext';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PlaceContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </PlaceContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
