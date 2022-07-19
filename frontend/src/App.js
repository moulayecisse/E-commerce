import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";

/*   Components */
import Navbar from "./components/Navbar";

/*   Admin Crud Product */
import ListProducts from "./Routes/Admin/Product/ListProducts";
import AddProduct from "./Routes/Admin/Product/AddProduct";
import UpdateProduct from "./Routes/Admin/Product/UpdateProduct";
import ProductDetails from "./Routes/User/ProductDetails";

/*   Admin Crud Category */
import AdminPanel from "./Routes/Admin/AdminPanel";

/*   User */
import Register from "./Routes/User/Register";
import Login from "./Routes/User/Login";
import Products from "./Routes/User/Products";
import SearchResult from "./Routes/User/SearchResult";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/search" element={<SearchResult />} />
          <Route path="/product/search/:title" element={<SearchResult />} />
          <Route path="cart" element={<Cart />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/products" element={<ListProducts />} />
          <Route path="/admin/product/add" element={<AddProduct />} />
          <Route path="/admin/product/edit/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
