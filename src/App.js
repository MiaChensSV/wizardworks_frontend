import './App.css';
import Desk from './components/Board/Board';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <Desk />
        </div>
      </header>
    </div>
  );
}

export default App;
