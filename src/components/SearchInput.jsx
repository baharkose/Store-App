// import React from "react";
// import { searchIcon } from "../helper/icons";

// // - 45 seacrh inputu karşıladık. onChange ile setSearchin içerisine attık. tekrar producta..
// const SearchInput = ({search, setSearch}) => {
//   return (
//     <div className="">
//       <div className="relative w-6/12 mx-auto">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           {searchIcon}
//         </div>
//         <input
//           type="search"
//           id="default-search"
//           className="block outline-none w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-gray-900  focus:text-black"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e)=> setSearch(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchInput;

// -74 bir kopya oluşturduk. 
import React from "react";
import { searchIcon } from "../helper/icons";
import { useProducts } from "../context/ProductProvider";

//- 75 context alanından bilgiyi çektik. 

const SearchInput = () => {
  const {search, setSearch} = useProducts()
  return (
    <div className="">
      <div className="relative w-6/12 mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {searchIcon}
        </div>
        <input
          type="search"
          id="default-search"
          className="block outline-none w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-gray-900  focus:text-black"
          placeholder="Search products..."
          value={search}
          autoComplete="off"
          //! önerilerin çıkmaması için
          onChange={(e)=> setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;

