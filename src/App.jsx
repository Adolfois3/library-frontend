import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { ALL_AUTHOR } from "./components/ServiceGql";
import { ALL_BOOKS } from "./components/ServiceGql";
import Login from "./components/Login";
import { ApolloClient } from "@apollo/client";
import Recomended from "./components/Recomended";


const App = () => {

  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [message, setMesagge] = useState(null)
  const client = useApolloClient()

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
      </div>
      <Recomended show={page === "recommend"}/>
      <Authors authors={result.data.allAuthor} show={page === "authors"}  />
      <Books   show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
