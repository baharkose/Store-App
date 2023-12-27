import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import ScrollToTop from "../components/ScrollToTop";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRouter />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard/products" element={<Products />} />
          {/* //- iki noktadan sonra bir değişken gelir. Bu değişken useParams ile yakalanır.
              //- dinamik değişken parametreler neyden sonra gelir soru işaretinden sonra gelir. backenddeki arama isteğimiz aslında ? işaretinden sonra gelen kısım. 

              //- 39 useLocation ilgili parametreler sorgular vs. bizim yakalamamızı sağlar.
              //- useNavigate hookunun bir diğer özelliği de nedir giderken yanında bir yükte taşıyabilir. Şu sayfaya git şu yükü de götür diyebiliyoruz.

              //! 40 şimdi apilerle iletişim kuralım products sayfasına ışınlanalım
          */}

          <Route path="products/:title" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
