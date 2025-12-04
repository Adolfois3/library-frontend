import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "./ServiceGql"
import { useState } from "react"


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  const [filter,setFilter] = useState('all')


  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Cargando libros...</div>
  }

  const books = result.data.allBooks

  const bookToShow = filter === 'all' ? books : books.filter(book => book.genres.includes(filter))

  const genres = [...new Set(books.flatMap(b => b.genres))]


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookToShow.map((a) => (
            <tr key={a.id || a.title}>
              <td>{a.title}</td>
              <td>{a.published}</td>
              <td>{a.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map(genre =>(
        <button key={genre} onClick={()=> setFilter(genre)}>{genre}</button>
      ))}
      <button onClick={()=> setFilter('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
