import './App.css';
import Desk from './components/Board/Board';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <Desk />
          environmental variable test
          {process.env.REACT_APP_BASE_URL}
        </div>
      </header>
    </div>
  );
}

export default App;
