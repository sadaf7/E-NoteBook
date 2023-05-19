import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notesState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import { useState } from 'react';
import ProfileState from './context/profileState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
    <ProfileState>
    <NoteState>
    <Router>
      <div className="container">

      <Navbar/>
      </div>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
        <Route exact path='/about' element={<About/>}/>      
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}/> 
        <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
 
      </Routes>
      </div>
    </Router>
    </NoteState>
    </ProfileState>
    </>
  );
}

export default App;
