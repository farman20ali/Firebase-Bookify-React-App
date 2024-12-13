import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase
        .fetchMyBooks(firebase.user.uid)
        .then((books) => setBooks(books.docs)) // Fetch books and set state
        .catch((error) => console.error("Error fetching books:", error)); // Handle errors
    }
  }, [firebase]);

  console.log("books (order Page): ", books);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div>
      <h2>View Orders</h2>
      {books && books.length > 0 ? <CardGroup> {(
        books.map((book) => {
          const bookData = book.data(); // Extract book data
          return (
            <BookCard
              link={`/books/orders/${book.id}`} // Ensure the link matches your route
              key={book.id}
              id={book.id}
              {...bookData}
  
            />
          );
        })
      )} </CardGroup>: (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
