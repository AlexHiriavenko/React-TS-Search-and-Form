import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import getCharacters, { ApiResponse } from '../../actions/getCharacters';
import { RootState } from '../../redux/rootStateType';
import {
  resetCharacter,
  setCharacters,
} from '../../redux/Slices/characters.slice';

interface PagBtnsProps {
  homeLoading: boolean;
  setHomeLoading: Dispatch<SetStateAction<boolean>>;
}

function PaginationBtns(props: PagBtnsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParam = useSelector(
    (state: RootState) => state.search.searchParam
  );
  const countPages = useSelector(
    (state: RootState) => state.pagination.countPages
  );

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
      console.log(searchParam);
      const endPoint = !searchParam.includes('search')
        ? basicURL + searchParam.slice(1) + pageNumber
        : basicURL + searchParam + `&page=${pageNumber}`;
      navigate(`/page/${pageNumber}`);

      try {
        dispatch(resetCharacter());
        setHomeLoading(true);
        const { results }: ApiResponse = await getCharacters(endPoint);
        dispatch(setCharacters(results));
        setHomeLoading(false);
        setActiveButton(pageNumber);
      } catch (error) {
        console.error('error get data:', error);
        setHomeLoading(false);
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
