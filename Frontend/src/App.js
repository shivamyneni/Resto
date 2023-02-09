import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";
import SignIn from './pages/SignIn'
import Contact from './pages/Contact';
import About from './pages/About';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <About/> } />
        <Route path="signin" element={ <SignIn/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </div>
  );
}

export default App;
