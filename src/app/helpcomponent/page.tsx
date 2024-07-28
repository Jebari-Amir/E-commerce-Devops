"use client";
import React from "react";

const HelpComponent = () => {
  return (
    <div className="flex items-center p-6 bg-grey shadow-md rounded-md relative isolate overflow-hidden mx-auto max-w-7xl py-4 sm:py-6 lg:py-14 mb-4">
      <div className="flex-1 flex flex-col items-start">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Besoin d'aide ?</h2>
        <h3 className="text-lg font-semibold mb-4">Nous sommes là pour vous !</h3>
        <p className="text-left mb-4">
          Besoin de conseils sur une commande ou bien vous êtes à la recherche d'un produit en particulier ? Contactez notre super équipe ! Et devenez l'un de nos <span className="font-bold">500 000 clients heureux</span>.
        </p>
        <div className="flex flex-row justify-start space-x-4 mb-4">
          <a href="#" className="text-blue-600 underline">
            Contactez-nous
          </a>
          <a href="#" className="text-blue-600 underline">
            Centre d'aide
          </a>
          <a href="#" className="text-blue-600 underline">
            E-mail
          </a>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <img src="rate.png" alt="Trustpilot" className="h-20"/>
          <div className="text-green-600 font-semibold">4.2</div>
          <div className="text-gray-600">Selon 4149 avis vérifiés</div>
        </div>
      </div>
      <div className="flex-none ml-6">
        <img src="qq.png" alt="Person 1" className="rounded-full h-60 w-90"/>
      </div>
    </div>
  );
};

export default HelpComponent;
