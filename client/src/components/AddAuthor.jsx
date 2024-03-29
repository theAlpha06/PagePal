import { useMutation } from "@apollo/client";
import { addAuthorMutation, getAuthorsQuery } from "../queries/queries";
import { useState } from "react";

function AddAuthor() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [addAuthor, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(addAuthorMutation, {
    variables: { name, age: parseInt(age) },
    refetchQueries: [{query: getAuthorsQuery}]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await addAuthor();
      console.log(name, age);
      setName('');
      setAge('');
    } catch (error) {
      console.error('Submission error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Author name:</label>
        <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Age:</label>
        <input type="text" 
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button type="submit">Add Author</button>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error: {mutationError.message}</p>}
      {mutationData && <p>Author added!</p>}
    </form>
  )
}

export default AddAuthor;