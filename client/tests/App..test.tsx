import { screen, render, within } from '@testing-library/react';
import { PlaceContext } from '@/hooks/usePlaceContext';
import type { PlaceContextType } from '@/hooks/usePlaceContext';

import ImageGallery from '../src/components/main/ImageGallery';
import { expect } from 'vitest';

describe('Test what user see in the initial', () => {
  test('show loading initial', () => {
    const mockContext = {
      isLoading: true,
      places: [],
    } as unknown;

    const { getByLabelText } = render(
      <PlaceContext value={mockContext as PlaceContextType}>
        <ImageGallery />
      </PlaceContext>,
    );

    screen.debug();
    expect(getByLabelText('spinner')).toBeInTheDocument();
  });

  test('show no place found when is not found', () => {
    const mockContextLoad = {
      isLoading: false,
      places: [],
    } as unknown;

    const { getByText } = render(
      <PlaceContext value={mockContextLoad as PlaceContextType}>
        <ImageGallery />
      </PlaceContext>,
    );

    expect(getByText('No places found.')).toBeInTheDocument();
  });

  test('show five content and pagination after loading', async () => {
    const mockContextPlaces = {
      isLoading: false,
      totalPages: 1,
      places: [
        { id: 1, title: 'Place', imageUrl: 'img1.jpg' },
        { id: 2, title: 'Place', imageUrl: 'img2.jpg' },
        { id: 3, title: 'Place', imageUrl: 'img3.jpg' },
        { id: 4, title: 'Place', imageUrl: 'img4.jpg' },
        { id: 5, title: 'Place', imageUrl: 'img5.jpg' },
      ],
    } as unknown;

    const { getAllByText, getByLabelText } = render(
      <PlaceContext value={mockContextPlaces as PlaceContextType}>
        <ImageGallery />
      </PlaceContext>,
    );

    const ul = within(getByLabelText('pagination')).getByRole('list');

    screen.debug();
    const items = within(ul).getByText('1');

    expect(getAllByText('Place')).toHaveLength(5);

    expect(items).toBeInTheDocument();
  });
});
