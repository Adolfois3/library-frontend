import { gql } from "@apollo/client";

export const CREATE_BOOKS = gql`
mutation createBooks($title: String!, $published: Int!, $author: String!, $genres:[String!]) {
  addBook(
  title: $title,
  published: $published ,
  author: $author,
  genres: $genres
  ) {
    title
    author{
    name
    born
    }
    published
    genres
  }
}
  `

    export const ALL_AUTHOR = gql`
query {
  allAuthor {
  id
    name
    born
  }
}
  `
  export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      genres
      author{
      id
      name
      born
      }
  }

  }
  `

  export const UPDATE_AUTHOR =  gql`
mutation updateAuthor($name:String!, $setBorn:Int!){
  addBorn(name: $name, setBorn: $setBorn) {
    born
    name
  }
}
`


export const LOGIN_ = gql`
mutation loguear($username: String!,$password: String!){
login(username: $username, password: $password){
  value
}
}
`


