import { useEffect, useState } from "react"
import { LOGIN_ } from "./ServiceGql"
import { useMutation } from "@apollo/client/react"


const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  const[login, result] = useMutation(LOGIN_,{
    onError:(error)=>{
        props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() =>{
    if(result.data){
        const token = result.data.login.value
        props.setToken(token)
        localStorage.setItem("book-user-token", token)
    }
  },[result.data]) // eslint-disable-line


if (!props.show) {
    return null
  }

    const submit = async (event)=>{
    event.preventDefault()
    login({variables: {username, password}})
  }




  return (
    <div>
        <form onSubmit={submit}>
            <div>
                <label>Username</label>
                <input value={username} onChange={({target})=> setUsername(target.value)} name="username" type="text" />
            </div>
                <div>
                <label >Password</label>
                <input value={password} onChange={({target})=> setPassword(target.value)} name="password" type="text" />
            </div>
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login
