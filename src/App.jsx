import './App.css';
import Greeting from './slides/Greeting';
function App() {
  return (
    <div className="App">
      <audio src={song} loop autoPlay></audio>
      <Greeting />
    </div>
  );
}

export default App;
