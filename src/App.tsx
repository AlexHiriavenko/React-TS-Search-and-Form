import { Component } from 'react';
import './styles/App.scss';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Home />
      </>
    );
  }
}

export default App;
