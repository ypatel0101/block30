import { useEffect, useState } from 'react';

const SingleBook = ({ bookId }) => {
  const [book, getBook] = useState(null);
  const [error, getError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';
      try {
        const response = await fetch(`${API_URL}/api/books/${bookId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(); 
        }

        const data = await response.json();
        getBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        getError('Error fetching book details');
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (error) return <div>{error}</div>; 
  if (!book) return <div>Loading book details...</div>;

  return (
    <div>
      <img src={book.coverimage} alt={`Cover of the book: ${book.title}`} />
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Availability: {book.available ? 'Available' : 'Checked out'}</p>
    </div>
  );
};

export default SingleBook;
