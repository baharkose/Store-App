//AuthContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // -1 dışarı açmak istediğimiz değişlenlerimizi outprovider içerisinde tanmlıyoruz.
  //-2 buradaki mantık şu şekilde düşünülebilir. Elden ele veri aktarmak yerine havuzdan isteyen kişilerin verileri çekebilmesi.
  //-3 babaanne ne yapıyo havuza parayı atıyo diğerleri de ne yapıyo havuzdan direk veriyi çekiyor.

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null 
  );
//-33 setUserın başlangıç değerini localdeki user yap yoksa null yap. stringfy yapılan bi işlemi tekrar eski haline getirebilmek için obje dizi vs. ne yapmamız lazım parse yapmamız lazım.

//* 34 NESTED ROUTE'LARDA NAVLINK YONTEMİ SAĞLIKLI çalışmaz. Burda devreye useLocation hooku girer. şimdi de gelelim navbarı düzeltmeye navlinkin active özelliği nested routelarda sağlıklı çalışmıyor. home pathinde bulunan dashboard products ve aboutta da aktif olduğu için hem homeun hem de tıklanılan nested element atif clasından etkilenir. Şimdi navbara ışınlanalım.


//- useLocation hooku aktif olan pathi bize veren hooktur. home, dashboard/products vs

  const navigate = useNavigate();

  //-11 oda gelen bilgileri aldı ve bizim userStatetimizi doldurdu. VE kullanıcıyı içeri aldı.
  //-12 yönlendirme nerede autproviderda.
  //- 13 navigate ile beraber ne yaptık yönlendirme yaptık.
  //- 14 şimdi dinamik bir yapı oluşturmaya sıra geldi bunun için navbarımıza ışınlandık.

  const login = (info) => {
    setUser(info);
    navigate("/dashboard");
  };

  //-23 bunu yapmamızın sebebi şu, gerçek server üzerinde çalışırken bu şekilde bir yapı ile haraket etmemiz gerekli, onlara bir simulasyon olması amacıyla. Bizim logoutumuz ne yapıcak bizim setUserımızı null yapıcak tek yapacağı işlem bu.

  //-24- fonksiyonumuzu oluşturduk bu fonksiyonumuzu kullanabilmek için ne yapmamız lazım satışa hazır hale getirmemiz lazım. Havuza atmammız lazım

  const logout = () => {
    setUser(null);
    // setUser({})
  };


  //- 30 çok basit bi şekilde sayfa yüklendiğinde login ekranı tekrar açılmasını engellemek için --> useEffect içerisine sessionStorage kullabiliriz. 

  //!31 session tarayıcı kapandığında local ne zaman silerseniz. lifecycylelar mülakatlarda banko çıkar. bunlar ve useEffect ile birlikte kullanımları

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]); //!componentDidUpdate

  //- 32 userı takip et dolduğunda, boşaldığında locali güncelle. Şimdi de okuma kısmını setUserda yapalım - bu sayaede sayfa refreshlendiğinde login ekranına tekrar yönlenilmemiş oldu. logout yapıca bilgiler gitsin tamamen o nedenle local storage yerine bunu session storage kullanmak çok daha mantıklı.

  return (
    //-4 birden fazla obje olduğu için ne yaptık iki tane süslü içerisine aldık

    //- 5 burada ne yaptık bir sarmallama yaptık. Aynı şekilde kimi children yapmak istiyosak oraya gidip gerçek sarmallama işlemini yapıyoruz. Yani herkes erişsin diye Aprouterı sarmalladık.

    //-25 geldik ve logout fonksiyonumuzu vitrine koyduk. peki bunu kim çekicek kim alıcak navbar. kim tüketicek. 
    <AuthContext.Provider value={{ user, login, logout }}> 
    {/* //! satışa koy mağazata vitrinde */}
    
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
