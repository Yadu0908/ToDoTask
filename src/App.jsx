
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import "./App.css"
import Login from './components/Login'
import Todo from './components/Todo'
import { useState } from 'react';

function App() {

  const [isAuthenticate, setIsAuthenticate] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticate(false);
  };


  return (

    <>

      <BrowserRouter>


        <nav className="navbar">
          <h1>My to do app</h1>
          <div className="links">

            {

              !isAuthenticate && (

                <Link to="/">Login page</Link>
              )
            }

            {

              isAuthenticate && (

                <>
                  <Link to="/todo">To-Do List</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>

              )
            }
          </div>


        </nav>

        <Routes>
          <Route path="/" element={<Login setIsAuthenticate={setIsAuthenticate} />} />
          <Route path="/todo" element={isAuthenticate ? <Todo /> : <Navigate to="/" />} />
        </Routes>


      </BrowserRouter>


    </>

  )
}

export default App
