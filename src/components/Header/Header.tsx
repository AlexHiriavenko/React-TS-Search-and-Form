import { Component } from 'react';
import Search from '../Search/Search';

class Header extends Component {
  render() {
    return (
      <header className="header-main">
        <Search />
      </header>
    );
  }
}

export default Header;
