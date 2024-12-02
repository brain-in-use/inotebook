import './App.css';
import React,{useState} from "react";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const[mode,changeMode]=useState("light");
  const toggleMode = ()=>{
    if (mode==='light'){
      changeMode('dark');
      document.body.style.backgroundColor = "#09253c";
      document.body.style.color="white";
    }
    else{
      changeMode('light');
      document.body.style.backgroundColor = "white";
      document.body.style.color="black";
    }
  }
  return (
    <NoteState>

      <Router>
<Navbar title="iNotebook" mode={mode} toggleMode={toggleMode}/>
<div className="container">
  <Routes>
  <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
  </Routes>
</div>
</Router>
   
</NoteState>
  );
}

export default App;
