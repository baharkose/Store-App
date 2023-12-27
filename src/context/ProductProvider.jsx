// ? ARAMA SONUÇLARININ GERİ TUŞUNDA KAYBOLMAMASI

import { createContext, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

//! 67 şimdi en önemli kısma gelelim, sayfada arama yaptıktan sonra geri gelince arama sonuçlarının kaybolmaması işlemi. Tekrar arama yapmayı engelleme. en son ne aratıldı kullanıcın bunu görmesi. sayfa yeniden render olduğu için geçmiş aramamız sıfırlanmış oluyor. Bu tarz yapılarda veriyi lokale taşımaya ihtiyacımız var. Şuan için bizim global alanımız neresi yeni bir context yapısı açmak.Neden çünkü hangi arama olduğunu sayfalar arasında bildirmemiz gerekiyor. context içerisinde ProductProvider Contextimizi oluşturalım.

//- 68 şimdi bir context create edelim. Ardından providerımızı yapalım. children propu ve returnunde productcontexprovider return edilsin

//-69 veri çekme ve ilgili statei productstan kopyala ve providera getir. Şimdi products sayfasında yaptığımız işlemleri globale taşıdık.Artık işlemleri buradan gerçekleştireceğiz. bunları kullanmak için dışarıya açtık. {{products, loading, search, setSearch bana ne lazım onları çağırdım havuza. konteksi oluşturduk bi de bunu consume eden bir hook hazırlayalım.

const ProductContext = createContext();

//? contexte ihtiyaç duymamızın sebebi detail sayfasına gittikten sonra geri geldiğimizde hem kullanıcının yazdığı query hem de api den gelen sonuçların kaybolmamasıni istememiz.
//! Ayrıca products sayfasında yapsaydık veri çekme işlemini her sayfa render olduğunda arama olmadığı halde apiye istek atacaktı.

//!2 sarmalayıcı componenti oluştur. Saklanan veriler,fonksiyonlar burada tanımlanır ve buradan paylaşılır


const ProductProvider = ({ children }) => {
  //-y40 apiden veri çekiceksek ne lazım set lazım içinde dizi, loading useStatei
  //- y41 şimdi inputa göre veri çekelim bizim inputumuz nerde search inputtan gelen componentin içinde veriyi nasıl yakalıyacağız o statei de orda oluşturmalıyız ki aşağıdan veriyi alabilelim.value=

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);//veri gelene kadar kullanıcıya boş sayfa göstermek yerine loading göstermek için

  //- y42 inputtan gelen veri için
  const [search, setSearch] = useState("");//*input için burada oluşturduk ki products sayfası render olduğunda userın yazdığı değer kaybolmasın.

  console.log(search);
  const getData = async () => {
    // - laodingi başlat
    setLoading(true);
    try {
      const { data } = await axios(
        `https://dummyjson.com/products/search?q=${search}`
        // - y43 soru işaretinden sonra parametreler gelir.
      );
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      // - y43 loadingi bitir
      setLoading(false);
    }
  };

  //-y44 yfonksiyonumuzu çalıştırmak için bir useEffecte ihtiyacımız var. Didmount olduğunda getData() yı çalıştır

  //-y46 yinput çalışısınca appDatanın çalışması için. her harfe tıklandığında istek atılsın.
  useEffect(() => {
    getData();
  }, [search]);

  // -70 bunları kullanabilmek için dışarıya açtık. Şimdi bunu consume eden bir hook hazırlayalım
  return <ProductContext.Provider value={{products, loading, search, setSearch}}>{children}</ProductContext.Provider>;
};

//-71 react hookları doğrudan bir js dosyası içerisinde kullanılamaz. o yüzden burada bir custom hook oluşturmamız gerekir. custom hooklar use keywordu ile kullanılır. Bu işlein amacı içerde import ederken daha kolay bir yapı sunmak. Aynı zamanda custom hooklar bir jsx return etmez. Şimdi appe gidip sarmallayalım

//! react hooklarını js fonksiyonları içierisinde kullanmadığımız için custom hooklara ihityaç duyarız. sutom hooklar jsx return etmez

export const useProducts = () =>{
  return useContext(ProductContext)
}



export default ProductProvider;



// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// //!1 contexti oluştur
// const ProductContext = createContext();
// //? contexte ihtiyaç duymamızın sebebi detail sayfasına gittikten sonra geri geldiğimizde hem kullanıcının yazdığı query hem de api den gelen sonuçların kaybolmamasıni istememiz.
// //! Ayrıca products sayfasında yapsaydık veri çekme işlemini her sayfa render olduğunda arama olmadığı halde apiye istek atacaktı.

// //!2 sarmalayıcı componenti oluştur. Saklanan veriler,fonksiyonlar burada tanımlanır ve buradan paylaşılır
// const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);//veri gelene kadar kullanıcıya boş sayfa göstermek yerine loading göstermek için
//   const [search, setSearch] = useState("");//*input için burada oluşturduk ki products sayfası render olduğunda userın yazdığı değer kaybolmasın.
//   console.log(search);
//   const getData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios(
//         `https://dummyjson.com/products/search?q=${search}`
//       );//! query boş string olduğunda api default olan 30 ürünü getiriyor.
//       console.log(data);
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [search]); //! search statei değiştikçe getData fonksiyonu çalışsın

//   return <ProductContext.Provider value={{products,loading,search,setSearch}}>{ children }</ProductContext.Provider>;
// };

// export default ProductProvider;

// //! zorunlu değil tükteim yaparken sadece kolaylık sağlıyor
// export const useProducts = () =>{
//     return useContext(ProductContext)
// }
// //! react hooklarını javascript fonksyionları içerisinde kullanamadığımız için custom hooklara ihtiyaç duyarız.
// //? custom hooklar use keywordü ile başlamak zorunda
// //* custom hooklar jsx return etmez.


// // //! Reducer Lı Kullanım
// // import axios from "axios";
// // import React, { createContext, useContext, useEffect, useReducer } from "react";

// // // statelerin oluşturulması
// // const initialState = {
// //   products: [],
// //   loading: false,
// //   search: "",
// // };

// // // Reducer fonksiyonu: State'i güncelleyen actionlar
// // const reducer = (state, { type, payload }) => {
// //   switch (type) {
// //     case "SET_PRODUCTS":
// //       return { ...state, products: payload };
// //     case "SET_LOADING":
// //       return { ...state, loading: payload };
// //     case "SET_SEARCH":
// //       return { ...state, search: payload };
// //     default:
// //       return state;
// //   }
// // };

// // // Context oluşturulması
// // const ProductContext = createContext();

// // // ProductContext sarmalı için ProductProvider bileşeni
// // const ProductProvider = ({ children }) => {
// //   // useReducer a reducer ı ve statelerimizi hem tanıttık hemde onun içerisinden state yani asıl verilerimiz ve statelerimizi değiştircek olan dispatchi aldık
// //   const [state, dispatch] = useReducer(reducer, initialState);

// //   // State değerlerinin ayrıştırılması
// //   const { products, loading, search } = state;

// //   const getProducts = async () => {
// //     dispatch({ type: "SET_LOADING", payload: true }); // loading stateini güncelledik
// //     try {
// //       const { data } = await axios(
// //         `https://dummyjson.com/products/search?q=${search}`
// //       );
// //       dispatch({ type: "SET_PRODUCTS", payload: data.products }); // gelen ürünler i dispatch ile stateimize aktarıyoruz.
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       dispatch({ type: "SET_LOADING", payload: false }); // laoding stateini tekrar false a çekiyoruz
// //     }
// //   };

// //   const setSearch = (value) => dispatch({ type: "SET_SEARCH", payload: value }); //! inputta kullanmak için setSearch diye bir fonksiyon oluşturduk. Bunun yerine dispatchi içerde de kullanabiliriz.
// //   useEffect(() => {
// //     getProducts();
// //   }, [search]);

// //   // ProductContext.Provider ile
// //   return (
// //     <ProductContext.Provider
// //       value={{
// //         products,
// //         loading,
// //         search,
// //         setSearch,
// //       }}
// //     >
// //       {children}
// //     </ProductContext.Provider>
// //   );
// // };

// // export default ProductProvider;

// // export const useProducts = () => {
// //   return useContext(ProductContext);
// // };

