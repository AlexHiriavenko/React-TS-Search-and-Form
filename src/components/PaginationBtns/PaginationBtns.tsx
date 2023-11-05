import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getCharacters, { ApiResponse } from '../../actions/getCharacters';
import { HomeProps } from '../../pages/Home/Home';

interface PagBtnsProps extends HomeProps {
  homeLoading: boolean;
  setHomeLoading: Dispatch<SetStateAction<boolean>>;
  resetCurrentCharacter: () => void;
  searchParam: string;
}

function PaginationBtns(props: PagBtnsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    countPages,
    homeLoading,
    setCards,
    setError,
    setHomeLoading,
    resetCurrentCharacter,
    searchParam,
  } = props;
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
        resetCurrentCharacter();
        setHomeLoading(true);
        const { results }: ApiResponse = await getCharacters(endPoint);
        setCards(results);
        setHomeLoading(false);
        setActiveButton(pageNumber); // Устанавливаем активную кнопку при клике
      } catch (error) {
        console.error('error get data:', error);
        setHomeLoading(false);
        setError(true);
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
