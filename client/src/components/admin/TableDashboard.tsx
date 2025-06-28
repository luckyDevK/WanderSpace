import { Pencil, Trash } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { useMemo, useState } from 'react';
import { memo } from 'react';

import { Button } from '../ui/button';
import { categories } from '@/lib/categories';

import type { RowData } from '@/types/ImageType';

const dummyPlaces: RowData[] = [
  {
    no: 1,
    title: 'Tumpak Sewu',
    description:
      'A stunning multi-tiered waterfall in East Java, often called the Indonesian Niagara.',
    imageUrl: 'https://example.com/images/tumpak-sewu.jpg',
    location: 'Lumajang, East Java, Indonesia',
    category: categories['6'],
    createdAt: new Date('2024-04-15'),
  },
  {
    no: 2,
    title: 'Pink Beach',
    description: 'A unique beach with pink sand located on Komodo Island.',
    imageUrl: 'https://example.com/images/pink-beach.jpg',
    location: 'Komodo Island, East Nusa Tenggara, Indonesia',
    category: categories['5'],
    createdAt: new Date('2024-05-01'),
  },
  {
    no: 3,
    title: 'Mount Bromo',
    description:
      'An active volcano offering breathtaking sunrise views and a vast sea of sand.',
    imageUrl: 'https://example.com/images/mount-bromo.jpg',
    location: 'East Java, Indonesia',
    category: categories['3'],
    createdAt: new Date('2024-03-20'),
  },
  {
    no: 4,
    title: 'Borobudur Temple',
    description:
      'The world’s largest Buddhist temple and a UNESCO World Heritage Site.',
    imageUrl: 'https://example.com/images/borobudur.jpg',
    location: 'Magelang, Central Java, Indonesia',
    category: categories['1'],
    createdAt: new Date('2024-02-10'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 3,
    title: 'Mount Bromo',
    description:
      'An active volcano offering breathtaking sunrise views and a vast sea of sand.',
    imageUrl: 'https://example.com/images/mount-bromo.jpg',
    location: 'East Java, Indonesia',
    category: categories['3'],
    createdAt: new Date('2024-03-20'),
  },
  {
    no: 4,
    title: 'Borobudur Temple',
    description:
      'The world’s largest Buddhist temple and a UNESCO World Heritage Site.',
    imageUrl: 'https://example.com/images/borobudur.jpg',
    location: 'Magelang, Central Java, Indonesia',
    category: categories['1'],
    createdAt: new Date('2024-02-10'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
  {
    no: 5,
    title: 'Ubud Art Market',
    description:
      'A traditional market with local crafts, fabrics, and Balinese art pieces. A traditional market with local crafts, fabrics, and Balinese art pieces.',
    imageUrl: 'https://example.com/images/ubud-market.jpg',
    location: 'Ubud, Bali, Indonesia',
    category: categories['2'],
    createdAt: new Date('2024-06-01'),
  },
];

const PlaceImgRenderer = () => (
  <img
    src="https://images.unsplash.com/photo-1703769605314-18648cfc3428?q=80&w=1485&auto=format&fit=crop&ixlib=rb-4.1.0"
    alt="img"
    className="w-30 aspect-square object-cover m-5"
  />
);

const ActionsRenderer = () => (
  <div className="space-x-4 mt-4">
    <Button className="bg-emerald-500 hover:bg-emerald-400 transition-colors duration-150">
      <Pencil strokeWidth={3} />
    </Button>
    <Button variant="destructive">
      <Trash strokeWidth={3} />
    </Button>
  </div>
);

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TableDashboard() {
  const [rowData, setRowData] = useState<RowData[]>(dummyPlaces);

  const colDefs = useMemo<ColDef<RowData>[]>(
    () => [
      { field: 'no' },
      { field: 'title', filter: true },
      {
        field: 'description',
        wrapText: true,
        maxWidth: 325,
      },
      {
        field: 'imageUrl',
        cellRenderer: memo(PlaceImgRenderer),
        autoHeight: true,
      },
      { field: 'location', maxWidth: 250, wrapText: true },
      { field: 'category', filter: true },
      {
        field: 'createdAt',
        valueFormatter: (params) =>
          new Date(params.value).toLocaleDateString('id-ID'),
      },
      { field: 'actions', cellRenderer: ActionsRenderer },
    ],
    [],
  );

  return (
    <div className="mt-10 mb-5 h-150">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true}
        onGridReady={(params) => {
          params.api.autoSizeAllColumns();
        }}
      />
    </div>
  );
}
