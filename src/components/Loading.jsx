import React from "react";
import { imageIcon } from "../helper/icons";

const Loading = () => {
  return (
    //- 49 şimdi iskelet yapısı ekleyelim - kartlara yüklenme efekti verme. burada dışarı taşmayan bir grid yapısı uygulanmış. 4 tane ürün maple

    //-50 tekrar productsa ışınlandık

    // <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="card-div">
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {[0, 1, 2, 3].map((_, i) => (
          <div key={i}>
            <div className="flex items-center justify-center h-80 animate-pulse bg-gray-300 rounded ">
              {imageIcon}
            </div>
            {/* //- burada yanıp sönme efekti için bunu uyguluyoruz.  */}
            <div className="mt-4 w-full animate-pulse">
              {/* yanıp sönme efeti */}
              <div className="flex justify-between w-full">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-8/12 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/12"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[90px]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
