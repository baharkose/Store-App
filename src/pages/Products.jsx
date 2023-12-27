import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import axios from "axios";
import { useProducts } from "../context/ProductProvider";
const Products = () => {
  // //-40 apiden veri çekiceksek ne lazım set lazım içinde dizi, loading useStatei
  // //- 41 şimdi inputa göre veri çekelim bizim inputumuz nerde search inputtan gelen componentin içinde veriyi nasıl yakalıyacağız o statei de orda oluşturmalıyız ki aşağıdan veriyi alabilelim.

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // //- 42 inputtan gelen veri için
  // const [search, setSearch] = useState("");

  // console.log(search);
  // const getData = async () => {
  //   // - laodingi başlat
  //   setLoading(true);
  //   try {
  //     const { data } = await axios(
  //       `https://dummyjson.com/products/search?q=${search}`
  //       // - 43 soru işaretinden sonra parametreler gelir.
  //     );
  //     console.log(data);
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // - 43 loadingi bitir
  //     setLoading(false);
  //   }
  // };

  // //-44 fonksiyonumuzu çalıştırmak için bir useEffecte ihtiyacımız var. Didmount olduğunda getData() yı çalıştır

  // //-46 input çalışısınca appDatanın çalışması için. her harfe tıklandığında istek atılsın.
  // useEffect(() => {
  //   getData();
  // }, [search]);

  // // - 45 şimdi inputa gelicek olan değerleri yakalıyoruz. o nedenle search ve setSearcu inputun olduğu searchInputa yolladık. şimdi oraya ışınlanalım

  //! 73 üst satırları contexte çağıracağımız için yoruma aldık. Artık statelere de ihtiyacımız kalmadı o nedenle yoruma aldık.  Şimdi search alanına gidelim ve orada consume işlemimizi yapalım

const {products, loading} = useProducts()

  return (
    // <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="card-div">
      {/* <SearchInput search={search} setSearch={setSearch} />  //- ihtiyacımız kalmadı o nedenle yoruma aldık  */}
      <h2 className="text-2xl font-bold mt-8 tracking-tight text-gray-900">
        All Products
      </h2>
      {/* //-47 loading true ise ekranda loading componentini göster değilse ürünleri göster
      //- fetchten sonra eğer apide ürün yoksa boş array döner bunun içinde bulunmadığı için kullanıcyı bilgilendirmemiz lazım bu nedenle gelen productsın lengthine bakılır. loadingten yani fetch işleminden sonra o zaman deki ürün yok değilse maple

      //- 48 şimdi iskelet yapısı ekleyelim - kartlara yüklenme efekti verme. şimdi loadinge --->
      
      */}
      {loading ? (
        <Loading />
      ) : products.length ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
          {/* //- küçük ekranda olmasını istediğin şeyi direk yaz md den sonra 3 col olsun lg den sonra 4 olsun vs vs. */}
          {/* //- 48 - div içerisine alınca ne oluyor tekrar html alanına geri dönüyo o nedenle tekrar bir süslü içerisine yazmamız gerekli şimdi style aşaması gap-x-8 demek xlden sonra gap 2 rem olsun*/}
         
         {/* //-50 şimdi map yapıyoruz o nedenle hemen id mizi verdik, sonra itemi yani ürün bilgilerini carda yoladık şimdi carda karşılama işlemi*/}
          {products.map((item) => (
            <ProductCard key={item} item={item} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-3xl text-red-600 mt-32">No Products</h2>
      )}
    </div>
  );
};

export default Products;
