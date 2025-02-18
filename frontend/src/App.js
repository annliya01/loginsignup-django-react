import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./Component/Login";
import {Home} from "./Component/Home";
import { Register } from './Component/Register';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
}
export default App;