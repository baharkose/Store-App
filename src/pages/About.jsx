import React from 'react';

const About = () => {
    return (
        <div className="bg-blue-50 h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Hakkımızda</h1>
            <p className="text-lg text-blue-800 mb-4">Biz, XYZ Mağazası olarak, 20 yıldır sektörde lideriz.</p>
            <p className="text-lg text-blue-800 mb-4">
                Müşterilerimize en kaliteli ürünleri sunma konusunda kararlıyız ve bu yolda 
                teknolojiyi ve tasarımı en iyi şekilde kullanmaya özen gösteriyoruz.
            </p>
            <p className="text-lg text-blue-800 mb-4">
                Sürdürülebilirlik ve müşteri memnuniyetini önceliklerimiz arasında tutarak, 
                sektördeki yenilikleri yakından takip ediyor ve sizlere en iyiyi sunmak için 
                sürekli kendimizi geliştiriyoruz.
            </p>
            <p className="text-lg text-blue-800">
                Amacımız, siz değerli müşterilerimizin yaşam kalitesini artırıcı ürünlerle 
                hayatınızı kolaylaştırmaktır.
            </p>
        </div>
    );
};

export default About;
