import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ClearBtn from '../components/ClearBtn/ClearBtn';

afterEach(cleanup);

describe('ClearBtn component', () => {
  test('рендер компонента ClearBtn', () => {
    render(<ClearBtn clearInput={() => {}} />);
  });

  test('вызов функции clearInput при клике', () => {
    const handleClearInput = jest.fn();
    const { getByText } = render(<ClearBtn clearInput={handleClearInput} />);

    fireEvent.click(getByText('X'));
    expect(handleClearInput).toHaveBeenCalledTimes(1);
  });
});
