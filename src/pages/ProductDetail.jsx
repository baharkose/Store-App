import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  // -53 useParams ile title bilgisini kaptık. şimdi buna göre verileri çekemiyoruz id değil o nedenle şimdi burada devreye useNavigate hooku giriyor. Params bu senaryoda işe yaramadı. Elimizde herhangi bir single veri yok. Ne yapacağız?işte bu tarz durumlarda devreye useNavigate hooku giriyor useNavigate hookunun bir HEYBESİ var ve yanında yük taşıyabiliyor. -> ProductCarda ışınlandık. Orda bilgiler. useNAVIGATE heybeisnde yük taşır yönlendirme yaparken...ve BU YÜKÜ useLOCATION'a atar. kuryede kargoyu alır ve buraya getirir.

  //!54 ilk parametre gideceği adres ardından bir obje bekler bu objeyede state değeri veriyoruz. burada istediğimiz gibi bir veri gönderebiliyoruz . useNavigatei çağırdık. Ardından divin içeriisne navigateimizi yazdık.
  // const {title:params} = useParams() //-57 dinamik routelarda veri yakalar .

  // -57 burada veriyi kullancak olan useLocation içerisinde state vardı. Biz bu statei destr yaparak alabiliriz.

  //- 58 bu yöntemin bir dezavantajı bu linki alıp başkasına attığınızda herhangi bir şey görünmez. verilerin gelmesi için productsa ordan gitmek istediği yere tekrar.

  //- 59 şimdi navigate ile ileri geri butonlarına yönlendirme yapalım. Şimdi navigate yaparken url'in sonuna parametre ekleyebiliriz. Bunun için urlnin sonuna ? koymamız gerekir. url'e kendimiz manuel olarak parametre veriyoruz.  Bunu productCardda yapacağız elimize id bilgisi de gelsin oraya gidelim

  // -62 search bize ? işaretinden sonraki kısımları sunar. pathname tamamını verir. fetch ise # işaretinden sonraki kısmı verir. aradaki boşluklar % ile gösterilir

  const { state, search } = useLocation();
  //-63 search ile id bilgisini elde ettik. ama bize eşittirden sonraki kısım lazım orayı ne yapabilirz split ile dilimleyebiliriz.

  //- 64 split bir array olutşurdu iki elemanlı bir eleman oluşturdu bu şekilde ikinci elemanı [1] diyerek çağırabiliriz. ve useEffetct ile çağırma işlemini yapmak.

  //- 65 hem state ile veri taşımak istemiyorsak hem de url de ürün adı yazmak istiyorsak bu yöntem

  // ? ARAMA SONUÇLARININ GERİ TUŞUNDA KAYBOLMAMASI

  //! 66 şimdi en önemli kısma gelelim, sayfada arama yaptıktan sonra geri gelince arama sonuçlarının kaybolmaması işlemi. Tekrar arama yapmayı engelleme. en son ne aratıldı kullanıcın bunu görmesi. sayfa yeniden render olduğu için geçmiş aramamız sıfırlanmış oluyor.



  const getDetailData = async () => {
    const {data} = await axios(`https://dummyjson.com/products/${search.split("=")[1]}`)
    console.log(data)

  }

  useEffect(()=>{
    getDetailData()
  }, [])

  const navigate = useNavigate()

  const { thumbnail, title, description, category, price, images } = state;
  console.log(state);
  // -58 burda verilerin geldiğini görebiliriz.
  
  return (
    <div className="container">
    <div className="mt-6 w-full ">
      <article className="mx-auto w-full block lg:flex mt-4 h-full 2xl:h-[70vh]  shadow-lg border rounded-md duration-300 hover:shadow-sm">
        <div class="grid grid-rows-4 gap-2 h-full w-full lg:w-7/12 p-4">
          <div className="w-full row-span-3">
            <img
              className="h-full w-full rounded-lg"
              src={thumbnail}
              alt=""
            />
          </div>
          <div className="grid grid-cols-3 gap-4 row-span-1">
            {images.slice(0, images.length - 2).map((item, i) => (
              <div key={i}>
                <img
                  className="h-[15vh] w-full rounded-lg"
                  src={item}
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-evenly p-4">
          <div className="pt-3 ml-4 mr-2 mb-3">
            <h3 className="text-xl text-gray-900">{title}</h3>
            <p className="text-gray-400 mt-1">{description}</p>
          </div>
          <div className="flex  mt-2 pt-3 ml-4 mr-2">
            <div className="">
              <span className="block text-gray-900">
                Category : {category}
              </span>
              <span className="block  text-sm">Price : {price} $</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="border rounded-lg bg-labelColor text-white p-2"
            >
              Geri
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="border rounded-lg bg-main text-white p-2"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
  );
};

export default ProductDetail;
