import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Spinner from "react-bootstrap/Spinner";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);

  console.log(data);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, [firebase,params.bookId]);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      if(imageURL && imageURL.length>0){
        firebase.getImageURL(imageURL).then((url) => setURL(url));
      }
      
    }
  }, [data]);

  const [orderStatus, setOrderStatus] = useState(null); // Track order status

const placeOrder = async () => {
  if (qty && qty > 0) {
    try {
       await firebase.placeOrder(params.bookId, qty);
      setOrderStatus("Order placed successfully!"); // Set success message
    } catch (error) {
      setOrderStatus(`Error occurred: ${error.message}`); // Set error message
    }
  } else {
    setOrderStatus("Please enter a valid quantity"); // Invalid input
  }
};

  

 
if (data == null) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

  return (
    <div className="container mt-5">
  <h1>{data.name}</h1>
  <img
    src={url || process.env.PUBLIC_URL + "/default_book.jpg"}
    width="50%"
    style={{ borderRadius: "10px" }}
  />
  <h1>Details</h1>
  <p>Price: Rs. {data.price}</p>
  <p>ISBN Number: {data.isbn}</p>
  <h1>Owner Details</h1>
  <p>Name: {data.displayName}</p>
  <p>Email: {data.userEmail}</p>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Qty</Form.Label>
    <Form.Control
      onChange={(e) => setQty(e.target.value)}
      value={qty}
      type="Number"
      placeholder="Enter Qty"
    />
  </Form.Group> 
  {orderStatus && (
    <div style={{ marginTop: "10px", color: "green" }}>
      <strong>{orderStatus}</strong>
    </div>
  )}
  <Button onClick={placeOrder} variant="success">
    Buy Now
  </Button>
 
</div>

  );
};

export default BookDetailPage;
