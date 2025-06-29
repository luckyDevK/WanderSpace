import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Home from './pages/Home';
import PlaceContextProvider from './context/PlaceProvider';
import AuthContextProvider from './context/AuthProvider';

import RootLayout from './components/RootLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashboardPage from './pages/DashboardPage';
import PageNotFound from './pages/PageNoutFound';
import ProtectedRoute from './pages/ProtectedRoute';
import PersistLogin from './components/auth/PersistLogin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PlaceContextProvider>
            <AuthContextProvider>
              <Routes>
                <Route element={<PersistLogin />}>
                  <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="dashboard" element={<DashboardPage />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </AuthContextProvider>
          </PlaceContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
