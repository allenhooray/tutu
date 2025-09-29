import { useParams } from 'react-router-dom';

export const BookDetailView = () => {
  const params = useParams<{ id: string }>();
  const bookId = params.id;

  return (
    <div>
      <h1>Book Detail</h1>
      {bookId && <p>Book ID: {bookId}</p>}
    </div>
  );
};