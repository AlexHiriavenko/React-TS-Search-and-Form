import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getCharacters, { ApiResponse } from '../../actions/getCharacters';
import { context } from '../Context/context';

interface PagBtnsProps {
  homeLoading: boolean;
  setHomeLoading: Dispatch<SetStateAction<boolean>>;
}

function PaginationBtns(props: PagBtnsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, updateState } = useContext(context);
  const { countPages, searchParam } = state;

  const { homeLoading, setHomeLoading } = props;
  const [activeButton, setActiveButton] = useState<string | number>(1);

  const paginationButtons = Array.from({ length: countPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => handlePageClick(i + 1)}
      className={`pag-btn ${i + 1 === activeButton ? 'active' : ''}`}
      disabled={homeLoading ? true : false}
    >
      {i + 1}
    </button>
  ));

  async function handlePageClick(pageNumber: number) {
    function isSamePage(pageNumber: number): boolean {
      const locationNumber = Number(location.pathname.split('/').pop());
      return locationNumber === pageNumber;
    }

    if (!isSamePage(pageNumber)) {
      const basicURL = 'https://swapi.dev/api/people/';
      const endPoint = basicURL + searchParam + pageNumber;
      navigate(`/page/${pageNumber}`);

      try {
        updateState({ currentCard: null });
        setHomeLoading(true);
        const { results }: ApiResponse = await getCharacters(endPoint);
        updateState({ cards: results });
        setHomeLoading(false);
        setActiveButton(pageNumber);
      } catch (error) {
        console.error('error get data:', error);
        setHomeLoading(false);
        updateState({ error: true });
      }
    }
  }

  useEffect(() => {
    const pageNumber = location.pathname.split('/').pop() || 1;
    setActiveButton(+pageNumber);
  }, [location.pathname]);

  return <div className="pag-btns-group">{paginationButtons} </div>;
}

export default PaginationBtns;
