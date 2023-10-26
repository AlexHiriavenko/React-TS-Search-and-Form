import { Component } from 'react';
import Search from '../Search/Search';
import { Character } from '../../actions/getCharacters';

interface HeaderProps {
  updateCards: (newCards: Character[]) => void;
  setLoading: (bool: boolean) => void;
  setError: (bool: boolean) => void;
}

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
  }
  render() {
    return (
      <header className="header-main">
        <h1 className="app-title">Star Wars</h1>
        <Search {...this.props} />
      </header>
    );
  }
}

export default Header;
