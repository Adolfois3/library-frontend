
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

// Definimos las consultas GraphQL que necesitamos
const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;

const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
      id
        name
      }
      published
      id
    }
  }
`;

const Recomended = (props) => {
  // 1. Obtenemos los datos del usuario actual
  const { data: meData, loading: meLoading } = useQuery(ME);

  // 2. Obtenemos el género favorito del usuario
  const favoriteGenre = meData?.me?.favoriteGenre;

  // 3. Buscamos los libros del género favorito, pero solo si ya tenemos el género.
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre, // Omitimos esta query si no tenemos un favoriteGenre
  });

  if (!props.show) {
    return null;
  }

  if (meLoading || booksLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      {booksData?.allBooks.map((b) => (
        <div key={b.id}><strong>Book:  </strong>{b.title} by {b.author.name}</div>
      ))}
    </div>
  );
};

export default Recomended;
