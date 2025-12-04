import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client/react";
import { ALL_AUTHOR, ALL_BOOKS, BOOK_ADDED } from "./components/ServiceGql";
import Login from "./components/Login";
import { ApolloClient } from "@apollo/client";
import Recomended from "./components/Recomended";


const App = () => {

  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [message, setMesagge] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      setMesagge(`New book added: ${addedBook.title}`)
      setTimeout(() => {
        setMesagge(null)
      }, 5000)

      // Actualizamos la caché para que la UI se refresque
      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, ({ allBooks }) => {
        // Evitamos añadir duplicados si la caché ya se actualizó por otro medio
        if (allBooks.find(b => b.id === addedBook.id)) {
          return { allBooks }
        }
        return { allBooks: allBooks.concat(addedBook) }
      })
    }
  })
  useEffect(()=>{
    const tokenGuardado = localStorage.getItem('book-user-token')
    if(tokenGuardado){
      setToken(tokenGuardado)
    }
  },[])

  const result = useQuery(ALL_AUTHOR)

 

  if(result.loading){
    return <div>Loading...</div>
  }
  

  const logout = ()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return(
         <div>
        <h2>Login</h2>
        <strong>{message}</strong>
        <Login show={true} setToken={setToken} setError={setMesagge} />
      </div>
    )
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={()=> setPage("recommend")}>Recommend</button>
        <button onClick={logout}>logout</button>
        {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
      </div>
      <Recomended show={page === "recommend"}/>
      <Authors authors={result.data.allAuthor} show={page === "authors"}  />
      <Books   show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
