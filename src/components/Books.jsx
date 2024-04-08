import { useEffect, useState } from 'react';

const Books = () => {
  const [books, getBooks] = useState([]);

  useEffect(() => {
    const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';

    fetch(`${API_URL}/api/books`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching books');
      }
      return response.json();
    })
    .then(data => {
      if (data.books && Array.isArray(data.books)) {
        getBooks(data.books);
      } else {
       
        console.error('Error fetching books');
        getBooks([]); 
      }
    })
    .catch(error => {
      console.error('Error fetching books');
      getBooks([]); 
    });
  }, []);

  const handleBookClick = (book) => {
    const bookDetails = `
      Title: ${book.title}
      Author: ${book.author}
      Description: ${book.description}
      Available: ${book.available ? 'Yes' : 'No'}
    `;
    alert(bookDetails);
  };
  
  return (
    <div className="books-container">
      <h2>Books Available in the Library</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.coverimage} alt={book.title} className="book-cover" />
            <div className="book-info">
              <p className="book-title" onClick={() => handleBookClick(book)}>
                {book.title}
              </p>
              <button className="book-button">Add Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
