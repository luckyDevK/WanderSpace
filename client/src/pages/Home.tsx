import { Header } from '@/layout/Header';
import Main from '@/layout/Main';

import { getPlaces } from '@/lib/api/fetchPlaces';

export default function Home() {
  getPlaces();
  return (
    <>
      <main>
        <Header />
        <Main />
      </main>
    </>
  );
}
