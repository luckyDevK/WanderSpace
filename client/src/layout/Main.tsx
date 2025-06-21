import SearchBar from '@/components/main/SearchBar';

import PaginationTabs from '@/components/main/Pagination';
import ImageGallery from '@/components/main/ImageGallery';

export default function Main() {
  return (
    <main className="container mx-auto mt-10 flex justify-center flex-col md:px-0 px-5 mb-10">
      <SearchBar />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        <ImageGallery />
      </section>
      <PaginationTabs />
    </main>
  );
}
