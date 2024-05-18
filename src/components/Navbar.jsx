import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { closeNavbar, openNavbar, logoutIcon } from "../helper/icons";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

//-14 bunlar programlama mantığına ters düştüğü için copy paste yapmak bu nedenle ne yaptık. Bir obje tanımlayıp menülerimizi içerisine yerleştirdik. 

const navigation = [
  {
    title: "Home",
    path: "/dashboard",
  },
  {
    title: "Products",
    path: "/dashboard/products",
  },
  {
    title: "About",
    path: "/dashboard/about",
  },
];

const Navbar = () => {

  // - 18- sonrasında state ile navbarımızı responsive bir hale getirdik. herhangi bir loginden yararlanmadan responsive hale getirdik. 


  const [show, setShow] = useState(false);

  //- 26 tükecek kişi siparişi verdi. autcontexteki logoutu al. Şimdi geldik logouta aşağıdaki.
  const { logout } = useContext(AuthContext);

//* 35 NESTED ROUTE'LARDA NAVLINK YONTEMİ SAĞLIKLI çalışmaz. Burda devreye useLocation hooku girer. şimdi de gelelim navbarı düzeltmeye navlinkin active özelliği nested routelarda sağlıklı çalışmıyor. home pathinde bulunan dashboard products ve aboutta da aktif olduğu için hem homeun hem de tıklanılan nested element atif clasından etkilenir. Şimdi navbara ışınlanalım.

//-36 öncelikle useLocation hookumuzu router domdan çağırdık. bu bize clg ile baktığımızda hash, key, pathname, search ve state gibi bazı değerler verir. Bize path namei verdi. Urlden bilgileri almak için search ya da pat içerisinden yakalayabiliyoruz.

//- 37 bu bilgiler bizim navigation objemizin içerisinde var. aktif linkte useLocationdan geliyor o zaman biz ne yapabiliriz bunları kıyaslayabiliriz. Navlinkin içine geldik.



  const location = useLocation();
  console.log(location);

  return (
    <nav className="bg-blue-400 md:text-sm">
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a
            href=""
            target="true"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <span className="text-gray-700 hover:text-gray-900 font-medium">
              Bahar's Store
            </span>
          </a>

          {/** //-18 md ekranlardan 768px sonra hamburger ikonlarını gizle x iconu md ekranlardan sonra gizlensin diyoruz , burdaki hidden tailwind display:none a tekabül ediyor. */}

          <div className="md:hidden">

            <button
           
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setShow(!show)}
            >
              {show ? closeNavbar : openNavbar}
            </button>
          </div>
        </div>
        <div  
        //- 19-md-ekranlardan sonra dvi ne oluyır flex row oluyor. eğer show true ise ne yap butonları flex row yap
        //- 20 show ise flexi col yap. md ekranlardan sonra flexi row yap.
          className={`${
            show ? "flex flex-col pb-2" : "hidden"
          } flex-1 items-center md:flex md:flex-row`}
        >
          <ul className="space-y-6 md:flex md:space-x-6 md:space-y-0">

            {/* //- 15 objemizi map ettik ve li elementlerinin içerisine ne yaptık. Titlelarımızı yerleştirdik.

            //- navlink ile yönlendirme işlemlerimizi yaptık. navlink içerisine ne yaptık linklerimizi yerleştirdik.

            //! 16 - a tagine göre farkı servera istek atmaya programlanmış değil sayfanın yeniden refresh olmasını engeller. Yani react mantığına ters olur o nedenle sayfa içi yönlendirmelerimizde ne yapıyoruz navlink ya da link to kullanıyoruz.

            //- 17- navlink link farkı navlinkin css kabul etmesidir. Aynı zamanda isactive özelliğinin olması. urlde aktif olan pathi yakalayıp ona göre bir css özelliği verebilmemiz. Kullanım ve yönlendirme açısından başka herhangi bir farkı yoktur. 
            
            */}

            
            {navigation.map((item) => (
              <li
                key={item.title}
                className="text-gray-700 font-medium  flex justify-center"
              >
                <NavLink
                  to={item.path}
                  className={`block hover:bg-main rounded-full py-2 px-4 hover:text-white ${
                    // - 38 locationdan gelen pathname ile itemdan gelen path namei kıyasla. Dolar süslü ile yaptık bunu. aktif link hangisi ile onu location ile bulabildik. --> approuterdayız -->
                    location.pathname === item.path ? "underline scale-150" : ""
                  }`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <NavLink
              to="/"
              onClick={logout}
              className="flex items-center justify-center gap-x-1 py-2 px-4 font-medium text-gray-700 hover:bg-main hover:text-white active:bg-gray-900 rounded-full md:inline-flex"
            >

              {/*
              //! / işareti bu senaryoda logine gider.

              //- 21 şimdi logout kısmını biçimmlnedirelim, anasyafaya yönlediriyo ama kullanıcı geri geldiğinde manuel olarak  giriş yapabilir ya da geri gelebilir. o yüzden logouta basıldığında işimizi sağlama almak için statetimizi boşaltalım. 

              // - 22 private routerda koşul olarak verdiğimiz useStateni boşaltalım. . Kullanıcı logout yaptığında tekrar geri gelemesin dönemesin. O yüzden ne yapıyoruz contexe gidip logout fonksiyonumuzu oluşturuyoruz. -> authprovidera --->
              */}
              Logout {logoutIcon}

              {/* //-27 navlink zaten bizi logine yönlediriyo o nednele tekrar yazmaya ihtyacımız kalmadı
              //- 28 ne yapıyoruz navlinkin onClickine loguoutu veriyoruz. Artık şimdi ne yapıcak hem logout yapıcak logine yönlendiricek hemde onClick olduğunda içerik boşlamtılmış olucak.

              //- 29 sayfayı yenilediğimizde stateler inital değerine döndüğü için user bilgileri boşalmış oldu şimdi bunu çok basit bi şekilde çözelim. oO yüzden authprovider a ışınlanalım.
              */}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
