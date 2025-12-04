
import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_BOOKS, CREATE_BOOKS } from './ServiceGql'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBooks] = useMutation(CREATE_BOOKS,{
    refetchQueries:[{query:ALL_BOOKS}]
  })

  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    const publisehdInt = Number(published)
    try{
      const result = await  createBooks({variables:{title,author,published:parseInt(publisehdInt),genres,refetchQueries:[{query:ALL_BOOKS}]}})
    console.log("Libro creado", result.data.addBook)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    }catch(error){
      console.error("Error create books", error)
    }


  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook