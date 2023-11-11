import { Character } from '../../actions/getCharacters';

interface AppState {
  loading: boolean;
  error: boolean;
  currentCard: Character | null;
  cards: Character[];
  countPages: number;
  searchParam: string;
}

const initialState: AppState = {
  loading: true,
  error: false,
  currentCard: null,
  cards: [],
  countPages: 1,
  searchParam: '?page=',
};

export { initialState };
export type { AppState };
