import { Component } from 'react';
import Search from '../Search/Search';

class Header extends Component {
  render() {
    return (
      <header className="header-main">
        <h1 className='app-title'>Star Wars</h1>
        <Search />
      </header>
    );
  }
}

export default Header;
