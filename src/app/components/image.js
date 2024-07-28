import React from 'react';
import { useTranslation } from 'react-i18next';

function Image() {
  const { t } = useTranslation();

  return (
    <div className="relative py-4">
      <img
        src="https://contentful.helloprint.com/wm1n7oady8a5/3ujOfkgQrUVo3HsdhXyPKy/6fb571b8f385515d09ad6b328a6b9478/Promotional_print.jpg" 
        alt="Bags"
        className="w-full h-auto" 
        style={{ maxHeight: '600px' }} 
      />
       {/* Contenu en superposition */}
       <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-white p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Promotion responsable</h1>
        <p className="text-lg md:text-xl mb-6">
        Choisissez parmi notre gamme de produits écologiques et ayez 
        <br />
        un impact positif sur vos clients et sur la planète.<br /> Commandez dès aujourd'hui !
        </p>
        <div className="flex space-x-4">
        <a href="/inspiration" className="p-2 text-gray-400 hover:text-gray-500">

          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            
            Trouver l'inspiration
          </button>
          </a>
         
        </div>
      </div>
    </div>
  );
}

export default Image;