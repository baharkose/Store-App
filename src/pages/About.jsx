import React from 'react';

const Home = () => {
    return (
        <div className="bg-blue-50 h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Mağazamıza Hoş Geldiniz!</h1>
            <p className="text-lg text-blue-800 mb-2">Biz, elektronik ve mobilya alanlarında hizmet vermekteyiz.</p>
            <p className="text-lg text-blue-800 mb-6">En yeni teknolojik ürünleri ve kaliteli mobilyaları sizlerle buluşturuyoruz.</p>
            <div className="text-blue-700">
                <h2 className="text-2xl font-bold mb-2">İletişim Bilgilerimiz</h2>
                <p><strong>Adres:</strong> 1234 Sokak, No:56, Bahçelievler, İstanbul</p>
                <p><strong>Telefon:</strong> +90 212 123 45 67</p>
                <p><strong>Email:</strong> info@magazamiz.com</p>
            </div>
        </div>
    );
};

export default Home;
