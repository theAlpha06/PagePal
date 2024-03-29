import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries.js";

function DisplayAuthors() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data.authors.map(author => (
    <option key={author.id} value={author.id}>{author.name}</option>
  ))
}

function AddBook() {

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const [addBook, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(addBookMutation, {
    variables: { name, genre, authorId },
    refetchQueries: [{ query: getBooksQuery }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook();
      setName('');
      setGenre('');
      setAuthorId('');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option>Select author</option>
          {DisplayAuthors()}
        </select>
      </div>
      <button type="submit">Add Book</button>
      {mutationLoading && <p>Submitting...</p>}
      {mutationError && <p>Submission error! {mutationError.message}</p>}
      {mutationData && <p>Book added successfully!</p>}
    </form>
  )
}

export default AddBook;
