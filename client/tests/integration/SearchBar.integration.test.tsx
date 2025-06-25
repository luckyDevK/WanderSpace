import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { Mock } from 'vitest';

import axios from 'axios';

import SearchBar from '../../src/components/main/SearchBar';
import { baseUrl } from '@/lib/api/fetchPlaces';
import { searchPlace } from '@/lib/api/fetchPlaces';

const mockHandleSearch = vi.fn();

vi.mock('@/context/usePlaceContext', () => ({
  usePlacesContext: () => ({
    handleSearch: mockHandleSearch,
  }),
}));

vi.mock('axios');

describe('test search functionality', () => {
  test('render typing in the input search', async () => {
    const { getByPlaceholderText } = render(
      <>
        <SearchBar />
      </>,
    );

    const input = getByPlaceholderText('Type a place or keyword...');

    await userEvent.type(input, 'borobudur');

    expect(mockHandleSearch).toHaveBeenCalledWith('borobudur');
  });

  test('display image after search', async () => {
    const mockData22 = [
      { id: 1, title: 'Beach', imageUrl: 'beach.jpg' },
      { id: 2, title: 'Mountain', imageUrl: 'mountain.jpg' },
    ];

    (axios.get as Mock).mockResolvedValue({ data: mockData22 });

    const res = await searchPlace('pwow');

    expect(axios.get as Mock).toHaveBeenCalledWith(`${baseUrl}search?q=pwow`);

    expect(res).toEqual(mockData22);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
