import { useQuery } from "@apollo/client";
import PropTypes from 'prop-types';
import { getBooksQuery } from "../queries/queries.js";

function BookList({ onSelectBook }) { 
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (
          <li
            className="book"
            key={book.id}
            onClick={() => onSelectBook(book.id)} 
          >
            {book.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

BookList.propTypes = {
  onSelectBook: PropTypes.func.isRequired,
};

export default BookList;
