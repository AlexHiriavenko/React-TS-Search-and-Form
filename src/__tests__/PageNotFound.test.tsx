import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../components/Routes/Routes';

test('Убедитесь, что страница 404 отображается при переходе по неверному маршруту.', () => {
  render(
    <MemoryRouter initialEntries={['/nonexistent-route']} initialIndex={0}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText('Page Not Found')).toBeInTheDocument();
});
