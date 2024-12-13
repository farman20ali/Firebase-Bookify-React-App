import { Routes, Route } from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useFirebase } from "./context/Firebase";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const firebase = useFirebase();
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={firebase.isLoggedIn}>
            <HomePage />
          </ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={
          <ProtectedRoute isLoggedIn={firebase.isLoggedIn}>
          <ListingPage />
        </ProtectedRoute>} />

        <Route path="/book/view/:bookId" element={
          <ProtectedRoute isLoggedIn={firebase.isLoggedIn}>
            <BookDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/book/orders" element={
          <ProtectedRoute isLoggedIn={firebase.isLoggedIn}>
          <OrdersPage />
        </ProtectedRoute>} />

        <Route path="/books/orders/:bookId" element={
          <ProtectedRoute isLoggedIn={firebase.isLoggedIn}>
          <ViewOrderDetails />
        </ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
