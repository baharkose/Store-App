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

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]); //!componentDidUpdate

  return (
    //-4 birden fazla obje olduğu için ne yaptık iki tane süslü içerisine aldık

    //- 5 burada ne yaptık bir sarmallama yaptık. Aynı şekilde kimi children yapmak istiyosak oraya gidip gerçek sarmallama işlemini yapıyoruz. Yani herkes erişsin diye Aprouterı sarmalladık.

    //-25 geldik ve logout fonksiyonumuzu vitrine koyduk. peki bunu kim çekicek kim alıcak navbar. kim tüketicek. 
    <AuthContext.Provider value={{ user, login, logout }}> //! satışa koy mağazata vitrinde
    
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
