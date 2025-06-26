import { Outlet } from 'react-router-dom';

import { Header } from '@/layout/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto  flex justify-center flex-col  px-5 mb-10">
        <Outlet />
      </main>
    </>
  );
}
