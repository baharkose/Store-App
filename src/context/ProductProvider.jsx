// ? ARAMA SONUÇLARININ GERİ TUŞUNDA KAYBOLMAMASI

import { createContext, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

//! 67 şimdi en önemli kısma gelelim, sayfada arama yaptıktan sonra geri gelince arama sonuçlarının kaybolmaması işlemi. Tekrar arama yapmayı engelleme. en son ne aratıldı kullanıcın bunu görmesi. sayfa yeniden render olduğu için geçmiş aramamız sıfırlanmış oluyor. Bu tarz yapılarda veriyi lokale taşımaya ihtiyacımız var. Şuan için bizim global alanımız neresi yeni bir context yapısı açmak.Neden çünkü hangi arama olduğunu sayfalar arasında bildirmemiz gerekiyor. context içerisinde ProductProvider Contextimizi oluşturalım.

//- 68 şimdi bir context create edelim. Ardından providerımızı yapalım. children propu ve returnunde productcontexprovider return edilsin

//-69 veri çekme ve ilgili statei productstan kopyala ve providera getir. Şimdi products sayfasında yaptığımız işlemleri globale taşıdık.Artık işlemleri buradan gerçekleştireceğiz. bunları kullanmak için dışarıya açtık. {{products, loading, search, setSearch bana ne lazım onları çağırdım havuza. konteksi oluşturduk bi de bunu consume eden bir hook hazırlayalım.

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  //-y40 apiden veri çekiceksek ne lazım set lazım içinde dizi, loading useStatei
  //- y41 şimdi inputa göre veri çekelim bizim inputumuz nerde search inputtan gelen componentin içinde veriyi nasıl yakalıyacağız o statei de orda oluşturmalıyız ki aşağıdan veriyi alabilelim.value=

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //- y42 inputtan gelen veri için
  const [search, setSearch] = useState("");

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
