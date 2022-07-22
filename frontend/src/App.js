import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*   Components */
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import AdminPanel from "./Routes/Admin/AdminPanel";
/*   Admin Crud Product */
import ListProducts from "./Routes/Admin/Product/ListProducts";
import AddProduct from "./Routes/Admin/Product/AddProduct";
import UpdateProduct from "./Routes/Admin/Product/UpdateProduct";

/*   Admin Crud Category */
import ListCategories from "./Routes/Admin/Categories/ListCategories";
import AddCategorie from "./Routes/Admin/Categories/AddCategorie";
import UpdateCategories from "./Routes/Admin/Categories/UpdateCategories";

/*   User */
import Register from "./Routes/User/Register";
import Login from "./Routes/User/Login";
import Products from "./Routes/User/Products";
import ProductDetails from "./Routes/User/ProductDetails";
import SearchResult from "./Routes/User/SearchResult";
import Cart from "./Routes/User/Cart";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      {/* <Dropdown /> */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/search" element={<SearchResult />} />
        <Route path="/product/cart" element={<Cart />} />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<ListProducts />} />
        <Route path="/admin/product/add" element={<AddProduct />} />
        <Route path="/admin/product/edit/:id" element={<UpdateProduct />} />

        <Route path="/admin/categories" element={<ListCategories />} />
        <Route
          path="/admin/categorie/edit/:id"
          element={<UpdateCategories />}
        />
        <Route path="/admin/categorie/add" element={<AddCategorie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
