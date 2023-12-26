import React from "react";
import { useNavigate } from "react-router-dom";
// -51 import ettik onClick te yönlendirme yapalım.

const ProductCard = ({item}) => {
  const {title, category, description, price, thumbnail} = item
  // -50 ne lazımsa getirdik. 

   // -55 useParams ile title bilgisini kaptık. şimdi buna göre verileri çekemiyoruz id değil o nedenle şimdi burada devreye useNavigate hooku giriyor. Params bu senaryoda işe yaramadı. Elimizde herhangi bir single veri yok. Ne yapacağız?işte bu tarz durumlarda devreye useNavigate hooku giriyor useNavigate hookunun bir HEYBESİ var ve yanında yük taşıyabiliyor. -> ProductCarda ışınlandık. Orda bilgiler

  //!56 ilk parametre gideceği adres ardından bir obje bekler bu objeyede state değeri veriyoruz. burada istediğimiz gibi bir veri gönderebiliyoruz . useNavigatei çağırdık. Ardından divin içeriisne navigateimizi yazdık. itemi olduğu gibi yanında taşı dedik. Heybeyi doldurduk. Şimdi kaşrılayacak olan detail sayfasına geçtik. 

  const navigate = useNavigate()
//-63 search kısmnı ele geçirdik id bilgisi için
  return (
    // -52 benim routerda dinamik bir yapım vardı title. şimdi ne yapıcam onu burda ${} ile yönlendirdik. Bu beni nereye detail sayfasına yönlendiricek tıkladığımız ürünün bilgisi urlye geldi. Şimdi gelelim verileri aktarma işlemine bunları nasıl aktarıcaz productDetaile geldik...


      //- 60 şimdi navigate ile ileri geri butonlarına yönlendirme yapalım. Şimdi navigate yaparken url'in sonuna parametre ekleyebiliriz. Bunun için urlnin sonuna ? koymamız gerekir. url'e kendimiz manuel olarak parametre veriyoruz.  navigate(`/dashboard/products/${title}?detail=${item.id}` artık elimize id bilgisi geçti.http://localhost:3000/dashboard/products/OPPOF19?detail=4

      //!61 hem ürün adı görünsün hem id görünsün istiyorsak bu yöntemi kullanabiliriz. Peki biz detail=6 değerini nasıl yakalarız bunla ilgili bilgi elimizde var mı, ilgili urldeki bilgileri veren useLocationdur,

      // - cardDeatilse geçtik
      // -62 search bize ? işaretinden sonraki kısımları sunar. pathname tamamını verir. fetch ise # işaretinden sonraki kısmı verir. aradaki boşluklar % ile gösterilir


    <div className="cursor-pointer" onClick={() => navigate(`/dashboard/products/${title}?detail=${item.id}`, {state:item})}>
      {/* heybesinde yük taşır. yükü uselocationa atar. */}
      {/* //- hovera opacity verdik */}
      <div className="w-full rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
        <img
          src={thumbnail}
          alt={title}
          title={title}
          //! - 50 title attributeu bize üstüne geldiğimizde bir yazı getirir.
          // - 51 şimdi gelelim detail sayfaya gidilmesine neye ihtiyacım var navigate e hamen çağıralım 
          className="h-[200px] w-full object-fit lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex-1">
          <h3 className="text-sm text-gray-700 line-clamp-1">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price} $</p>
      </div>
    </div>
  );
};

export default ProductCard;
