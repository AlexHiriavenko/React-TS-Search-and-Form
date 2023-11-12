import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';

describe('Search', () => {
  it('should save the entered value in localStorage when the Search button is clicked', () => {
    const searchTerm = 'Luke Skywalker';

    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('enter character name'), {
      target: { value: searchTerm },
    });

    fireEvent.submit(screen.getByTestId('search-form'));

    expect(localStorage.getItem('lastSearch')).toBe(searchTerm);
  });
});
