import { render, queryByTestId } from '@testing-library/react';
import CharactersList from '../components/CharactersList/CharactersList';
import { context } from '../components/Context/context';
import { initialState } from '../components/Context/InitialState';

describe('CharactersList', () => {
  it('Убедитесь, что компонент отображает указанное количество карточек', () => {
    // игнор ошибки про оригинальные ключи - передаются оригинальные но jest все равно ругается
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const mockCard1 = {
      name: 'string',
      height: 'string',
      mass: 'string',
      hair_color: 'string',
      eye_color: 'string',
      birth_year: 'string',
      gender: 'string',
      homeworld: 'string',
      url: 'url1',
    };

    const mockCard2 = { ...mockCard1, url: 'url2' };
    const mockCards = [mockCard1, mockCard2];

    const mockContext = {
      state: { ...initialState, ...{ cards: mockCards } },
      updateState: () => null,
    };

    // Рендер компонента с использованием моков
    const { getAllByRole } = render(<CharactersList />, {
      wrapper: ({ children }) => (
        <context.Provider value={mockContext}>{children}</context.Provider>
      ),
    });

    // Проверка, что количество отображенных элементов равно количеству моковых карточек
    const renderedCards = getAllByRole('listitem');
    expect(renderedCards.length).toBe(mockCards.length);

    spy.mockRestore();
  });

  it('Убедитесь, что соответствующее сообщение отображается, если карты отсутствуют', () => {
    const mockContext = {
      state: { ...initialState, ...{ cards: [] } }, // пустой массив карточек
      updateState: () => null,
    };

    // Рендер компонента с использованием моков
    const { getByText } = render(<CharactersList />, {
      wrapper: ({ children }) => (
        <context.Provider value={mockContext}>{children}</context.Provider>
      ),
    });

    // Проверка, что отображается сообщение "No search results"
    expect(getByText('No search results')).toBeInTheDocument();

    // список карточек не рендерится
    expect(queryByTestId(document.body, 'characters-list')).toBeNull();
  });
});
