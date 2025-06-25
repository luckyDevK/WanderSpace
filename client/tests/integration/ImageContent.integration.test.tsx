import { render } from '@testing-library/react';
import { expect, vi } from 'vitest';

import ImageGallery from '@/components/main/ImageGallery';
import userEvent from '@testing-library/user-event';

vi.mock('@/context/usePlaceContext', () => ({
  usePlacesContext: () => ({
    isLoading: false,
    places: [
      { id: '1', title: 'Borobudur', createdBy: 'shakon' },
      { id: '2', title: 'Prambanan', createdBy: 'malin' },
    ],
  }),
}));

describe('test Image content', () => {
  test('click image open the modal', async () => {
    const { getByAltText, findByRole } = render(<ImageGallery />);

    const img = getByAltText('Borobudur');
    await userEvent.click(img);

    const dialog = await findByRole('dialog', { hidden: true });

    expect(dialog).toBeVisible();
    expect(dialog).toBeInTheDocument();
  });
});
