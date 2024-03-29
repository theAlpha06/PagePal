import { useQuery } from "@apollo/client";
import { getBookDetails } from "../queries/queries";

import PropTypes from 'prop-types';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookDetails, {
    variables: { id: bookId } 
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!data || !data.book) return null; 

  return (
    <div id="book-details" className="book-details">
      <h2>Book Details</h2>
      <div>
        <p>Book name: {data.book.name}</p>
        <p>Genre: {data.book.genre}</p>
        <p>Author: {data.book.author.name}</p>
        <p>Other books by this author:</p>
        <ul>
          {data.book.author.books.map(book => (
            <li key={book.name}>{book.name} ({book.genre})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

BookDetails.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default BookDetails;
