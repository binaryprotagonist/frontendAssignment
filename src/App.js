import logo from './logo.svg';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard'
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="">
      <BrowserRouter>
       
        <Route path="/" name="home" component={Dashboard} />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
