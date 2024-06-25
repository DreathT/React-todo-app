import {Routes, Route, React, BrowserRouter} from 'react-router-dom';
import ToDos from "./pages/home/todos";
import Calendar from "./pages/home/calendar";
import Login from "./pages/auth/login";
import Profile from "./pages/home/profile";
import './pages/auth/login.css';
import 'antd/dist/reset.css';


function App() {
  return (
    <> 
      {/* <nav>
        <NavLink to="/todos"> To-Do's </NavLink>
        <NavLink to="/Calendar"> Calendar </NavLink>
        <NavLink to="/profile"> Profile </NavLink>
      </nav> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;