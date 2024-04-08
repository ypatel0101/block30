import { useState, useEffect } from 'react';
import Login from './Login';

const Account = ({ onLogin }) => {
    const [authorizedUser, setauthorizedUser] = useState(null);
    const [bookCheckout, setbookCheckout] = useState([]);
  
    useEffect(() => {
      const fetchUserData = async () => {
        if (authorizedUser) {
          try {
            const userResponse = await fetch('/api/user', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${authorizedUser.token}`,
              },
            });
  
            if (!userResponse.ok) {
              throw new Error('Failed to fetch user data');
            }
  
            const userData = await userResponse.json();
            setauthorizedUser({ ...authorizedUser, ...userData });
  
            const checkedOutResponse = await fetch(`/api/user/${authorizedUser.id}/checked-out`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${authorizedUser.token}`,
              },
            });
  
            if (!checkedOutResponse.ok) {
              throw new Error('Failed to fetch checked-out books');
            }
  
            const checkedOutData = await checkedOutResponse.json();
            setbookCheckout(checkedOutData);
          } catch (error) {
            console.error(error.message);
          }
        }
      };
  
      fetchUserData();
    }, [authorizedUser]);
  
    const Login = (userData) => {
      setauthorizedUser(userData);
      if (onLogin) {
        onLogin(userData);
      }
    };
  
    const Checkout = async () => {
      try {
        const returnBookCheck = { ok: true };
        if (!returnBookCheck.ok) {
          throw new Error('Failed to checkout the book');
        }
  
        const checkedOutResponse = await fetch(`/api/user/${authorizedUser.id}/checked-out`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authorizedUser.token}`,
          },
        });
  
        if (!checkedOutResponse.ok) {
          throw new Error('Failed to fetch checked-out books');
        }
  
        const checkedOutData = await checkedOutResponse.json();
        setbookCheckout(checkedOutData);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const returnBook = async () => {
      try {
        const returnBookCheck = { ok: true };
        if (!returnBookCheck.ok) {
          throw new Error('book failed to return');
        }
  
        const checkedOutResponse = await fetch(`/api/user/${authorizedUser.id}/checked-out`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authorizedUser.token}`,
          },
        });
  
        if (!checkedOutResponse.ok) {
          throw new Error('Failed to fetch checked-out books');
        }
  
        const checkedOutData = await checkedOutResponse.json();
        setbookCheckout(checkedOutData);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    return (
      <div className="account-container">
        {authorizedUser ? (
          <div>
            <h2 className="account-header">Welcome, {authorizedUser.username}!</h2>
            <div className="checked-out-container">
              <h3 className="account-header">Checked Out Books</h3>
              {bookCheckout.length === 0 ? (
                <p>No books currently checked out.</p>
              ) : (
                <ul className="checked-out-list">
                  {bookCheckout.map((book) => (
                    <li key={book.id} className="checked-out-item">
                      <div className="checked-out-title">
                        {book.title} - {book.author}
                      </div>
                      <button className="return-button" onClick={returnBook}>
                        Return
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="checkout-container">
              <h3 className="account-header">Checkout a Book</h3>
              <button className="checkout-button" onClick={Checkout}>
                Checkout Book!!!
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="account-info">
             Login to view your account
            </p>
            <Login onLogin={Login} />
            <p className="account-info">
              If you do not have an account then sign up! <a href="/register">Sign up</a>
            </p>
          </div>
        )}
      </div>
    );
  };
  
  
  
  export default Account;