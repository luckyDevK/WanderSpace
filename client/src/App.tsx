import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Home from './pages/Home';
import PlaceContextProvider from './context/PlaceProvider';
import AuthContextProvider from './context/AuthProvider';
import RootLayout from './components/RootLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';

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
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </AuthContextProvider>
          </PlaceContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
