import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import bookLogo from './assets/books.png';
import Books from '/Users/yashpatel/Desktop/coursework/Unit3.BookBuddy.Starter/src/components/Books.jsx';
import SingleBook from '/Users/yashpatel/Desktop/coursework/Unit3.BookBuddy.Starter/src/components/SingleBook.jsx'; 
import Login from '/Users/yashpatel/Desktop/coursework/Unit3.BookBuddy.Starter/src/components/Login.jsx'; 
import Register from '/Users/yashpatel/Desktop/coursework/Unit3.BookBuddy.Starter/src/components/Register.jsx'; 
import Account from '/Users/yashpatel/Desktop/coursework/Unit3.BookBuddy.Starter/src/components/Account.jsx'; 

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <header>
        <h1><img id="logo" src={bookLogo} alt="Library Logo" />Library App</h1>
        <nav>
          <Link to="/">Home</Link>
          {!token && (
            <>
              <Link to="/login">Login</Link> | 
              <Link to="/register">Register</Link>
            </>
          )}
          {token && (
            <>
              <Link to="/account">Account</Link> | 
              <button onClick={() => setToken(null)}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:bookId" element={<SingleBook />} /> 
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={token ? <Account token={token} /> : <Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
