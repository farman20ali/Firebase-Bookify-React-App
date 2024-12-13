import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  const deleteOrder = async (bookId, orderId) => {
    try {
      await firebase.deleteOrder(bookId, orderId);
      alert("Successfully Deleted");
      setOrders((prev) => prev.filter((order) => order.id !== orderId)); // Update state
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching orders for bookId:", params.bookId);
    firebase.getOrders(params.bookId).then((orders) => {
      console.log("Fetched Orders:", orders.docs.map((doc) => doc.data()));
      setOrders(orders.docs);
    });
  }, [firebase, params.bookId]);

  return (
    <div className="container mt-3">
      <h1>View Order Details</h1>
      {orders && orders.length > 0 ? (
        orders.map((order) => {
          const data = order.data();
          return (
            <div
              key={order.id}
              className="mt-5"
              style={{ border: "1px solid", padding: "10px" }}
            >
              <h5>Order By: {data.displayName}</h5>
              <h6>Qty: {data.qty}</h6>
              <p>Email: {data.userEmail}</p>
              <Button
                onClick={() => deleteOrder(params.bookId, order.id)}
                variant="primary"
              >
                Delete Order
              </Button>
            </div>
          );
        })
      ) : (
        <p>No Orders Please Order First</p>
      )}
    </div>
  );
};

export default ViewOrderDetails;
