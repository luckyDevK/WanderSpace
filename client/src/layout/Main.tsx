import SearchBar from '@/components/main/SearchBar';

import ImageGallery from '@/components/main/ImageGallery';

export default function Main() {
  return (
    <main className="container mx-auto mt-10 flex justify-center flex-col  px-5 mb-10">
      <SearchBar />
      <ImageGallery />
    </main>
  );
}
