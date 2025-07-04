import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import SearchBar from '../../src/components/main/SearchBar';

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
});
