import Navbar from './Navbar';
import Home from './Home';

function App() {

  const title = 'Welcome to HAMAS UNIVERSITY';


  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="content">
        <Home></Home>

      </div>
      
    </div>
  );
}

export default App;
