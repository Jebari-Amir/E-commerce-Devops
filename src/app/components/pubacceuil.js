import React from 'react';
import Product from "./mapproduit";

const Advertisement = () => {
  return (
    <div className="bg-white py-8">

    <div className="w-full my-4 py-8" style={{ width: '95%', marginLeft:'37px' }}>
    <img
      src="sacc.png"
      alt="Promotion"
      className="w-full h-auto object-cover"
    />
  </div>



  <div className="flex justify-center items-center w-full my-4 p-4 bg-white rounded-lg shadow-md py-8" style={{ width: '95%', marginLeft: '37px' }}>
  <div className="flex-1 mr-8"> {/* Ajout d'une marge à droite */}
    <h2 className="text-2xl font-bold text-blue-900 mb-4">Gourde & mug, le cadeau d'entreprise parfait</h2>
    <p className="text-gray-700 mb-4">
      Étanchez votre soif de visibilité grâce à notre collection de gourde ! Du premier café du matin dans un mug imprimé à chaque gorgée tout au long de la journée avec les gourdes, votre logo accompagne vos clients et partenaires au quotidien !
    </p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded">Commander</button>
  </div>
  <div className="flex-1 flex justify-center items-center">
    <img
      src="bout.png"
      alt="Promotion"
      className="w-64 h-64 object-cover rounded-lg shadow-md transform transition duration-500 ease-in-out hover:scale-105"
    />
  </div>
</div>








    <Product />



    <div className="flex justify-center items-center w-full my-4 p-4 bg-white rounded-lg shadow-md py-8" style={{ width: '95%', marginLeft: '37px' }}>
      <div className="flex-1 flex justify-center items-center">
        <img
          src="//contentful.helloprint.com/wm1n7oady8a5/2YKsTzC2WeFcSN6GsCgCaG/f6da9f7f8f27ddaa81a698d3d3da9d76/Bobby-bizz-backpack-and-briefcase_PLP.png"
          alt="Promotion"
          className="w-64 h-64 object-cover rounded-lg shadow-md transform transition duration-500 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex-1 ml-8"> {/* Ajout d'une marge à gauche */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Le sac, l'objet promotionnel à emporter !</h2>
        <p className="text-gray-700 mb-4">
          Faites la promotion de votre marque avec nos sacs ! Nous vous proposons une gamme de sacs à dos, en coton, de sport et de sacs de voyage, tous prêts à arborer votre logo. Qu'il s'agisse d'événements d'entreprise, de cadeaux ou d'équipements d'équipe, ces sacs allient fonctionnalité et style, faisant de votre marque une partie intégrante de chaque voyage. Idéal pour les promotions éco-responsables avec nos sacs en coton ou pour faire sensation lors d'événements sportifs et de voyages. Laissez votre marque voyager loin, portée sur les épaules de ceux qui comptent le plus pour vous. Faites connaître votre logo d'une manière à la fois pratique et mémorable !
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Commander</button>
      </div>
    </div>



    </div>
  );
};

export default Advertisement;
