import AuthProvider from "./context/AuthProvider";
import ProductProvider from "./context/ProductProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    //- 6 Authcontexte belirttiğimiz sarmallamayı aynı şekilde burada uyguladık ki. Gerçek versiyon. Aynı şekilde kimi children yapmak istiyosak oraya gidip gerçek sarmallama işlemini yapıyoruz. Yani herkes erişsin diye Aprouterı sarmalladık. Artık approuterın tüm komponentlerinde bu global alana erişim sağlayabiliriz.

    //- Artık erişim hakkına sahibiz. Şimdi tüketebiliriz. Bunun için logine ışınlanıyoruz.

    //  -72 yapımızı sarmalladık. Şimdi işin consume ksımnı için products sayfasına gidelim


    // ? SCROLLBAR PROBLEMİ ÇÖZÜMÜ 
    // - scrolltotop componenneti oluştur. approutera çağır.
    <AuthProvider>
      <ProductProvider>
        <AppRouter />
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
