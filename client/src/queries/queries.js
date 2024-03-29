import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`

const getBookDetails = gql`
  query($id: ID!){
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          name
          genre
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
    }
  }
`

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!){
    addAuthor(name: $name, age: $age) {
      name
      age
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, getBookDetails, addBookMutation, addAuthorMutation };