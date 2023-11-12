import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { context } from '../components/Context/context';
import CharacterCard from '../components/Card/CharacterCard';
import { initialState } from '../components/Context/InitialState';

describe('CharacterCard', () => {
  it('displays character information correctly', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    const mockCard1 = {
      name: 'heroName',
      height: '10',
      mass: '10',
      hair_color: 'red',
      eye_color: 'red',
      birth_year: '1000',
      gender: 'male',
      homeworld: 'some-url',
      url: 'some-url',
    };

    const mockCards = [mockCard1];

    const mockContext = {
      state: {
        ...initialState,
        currentCard: mockCard1,
        cards: mockCards,
      },
      updateState: jest.fn(),
    };

    render(
      <context.Provider value={mockContext}>
        <CharacterCard />
      </context.Provider>
    );

    // Проверяем, что информация о персонаже отображается правильно
    expect(
      screen.getByText(`Hero Name: ${mockCard1.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`gender : ${mockCard1.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`birth year : ${mockCard1.birth_year}`)
    ).toBeInTheDocument();
    spy.mockRestore();
  });
});
