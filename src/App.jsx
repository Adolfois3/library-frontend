import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

  const ALL_AUTHOR = gql`
query {
  allAuthor {
    name
    born
  }
}
  `
  const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published

  }

  }
  `

const App = () => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHOR)
    const bookReslt = useQuery(ALL_BOOKS) 

  if(result.loading){
    return <div>Loading...</div>
  }
  if(bookReslt.loading){
    return <div>Loading...</div>
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={result.data.allAuthor} show={page === "authors"}  />

      <Books persons={ALL_BOOKS} books={bookReslt.data.allBooks} show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
