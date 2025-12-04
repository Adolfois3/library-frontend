
import { useMutation } from "@apollo/client/react"
import { useState } from "react"
import Select from "react-select"
import { ALL_AUTHOR, UPDATE_AUTHOR } from "./ServiceGql"



const Authors = (props) => {
  
  const [selectAuthor, setSelectAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries:[{query:ALL_AUTHOR}]
  })

  if (!props.show) {
    return null
  }
const authorOptions = props.authors.map(author => ({
    value: author.name, 
    label: author.name  
  }))

  const submit = async (event)=>{
    event.preventDefault()

    const name = selectAuthor ? selectAuthor.value: ''

    const bornInt = Number(born)
    try{
       await updateAuthor({variables: {name:name,setBorn:bornInt}})
      setSelectAuthor(null)
      setBorn('')

    }catch(error){
      console.error("Error al editar el nacimiento", error)
    }
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.id || a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <h2>set Birthyear</h2>
        <div>
          <label>Select Author</label>
          <Select 
          value={selectAuthor}
          onChange={setSelectAuthor}
          options={authorOptions}
          placeholder="Select Author...">
          </Select>
        </div>
        <div>
          born <input
          value={born}
          onChange={({target})=> setBorn(target.value)}
           type="text" 
           style={{marginTop:"10px"}}/>
        </div>
        <button>Update Author</button>
      </form>
    </div>
  )
}

export default Authors
