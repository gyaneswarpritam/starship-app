import './App.css';
import StarshipList from './Screens/StarshipList';

function App() {
  return (
    <div>
      <h1 style={{ paddingLeft: 20 }}>Star Wars Starships</h1>
      <div className='container'>
        <StarshipList />
      </div>
    </div>
  );
}

export default App;
