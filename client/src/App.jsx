import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import "./App.css";
import AddBookData from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import BookList from "./components/BookList";
import BookDetails from './components/BookDetails';

// Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  const [selectedBookId, setSelectedBookId] = useState(null); 

  const handleBookClick = (id) => {
    setSelectedBookId(id);
  };

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>PagePal</h1>
        <div className="book_container">
          <BookList onSelectBook={handleBookClick} /> 
          {selectedBookId && <BookDetails bookId={selectedBookId} />}
        </div>
        <div className="add_container">
          <AddBookData />
          <AddAuthor />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App;
