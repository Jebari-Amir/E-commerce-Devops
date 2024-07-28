"use client"
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Stronavigation from "../components/storenavigation";
import Footer from "../components/footer";
import Link from 'next/link';
import HelpCmd from "../components/helpcmd";
import HelpPaiement from "../components/helpPaiement";
import HelpDesign from "../components/helpdesign";
import HelpLiv from "../components/helpliv";
import HelpGeneral from "../components/helpgeneral";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  const items = [
    { id: "votre-commande", title: 'Votre commande', description: 'Comment passer une commande' },
    { id: "paiement-facture", title: 'Paiement et facture', description: 'Options de paiement et autres' },
    { id: "design-fichiers", title: 'Design des fichiers', description: 'Tout sur la création des fichiers' },
    { id: "livraison", title: 'Livraison', description: 'Options, délais, modifications, etc.' },
    { id: "general", title: 'Général', description: 'Informations sur votre compte et autres' },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const itemsToDisplay = searchTerm ? filteredItems : items;

  const handleItemClick = (itemId: string) => {
    setActiveHelp(itemId);
  };

  const renderActiveHelp = () => {
    switch (activeHelp) {
      case "votre-commande":
        return <HelpCmd />;
      case "paiement-facture":
        return <HelpPaiement />;
      case "design-fichiers":
        return <HelpDesign />;
      case "livraison":
        return <HelpLiv />;
      case "general":
        return <HelpGeneral />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Stronavigation />

      <header className="bg-gray shadow mt-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Comment pouvons-nous vous aider ?
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {!activeHelp ? (
                <>
                  <div className="text-center mb-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                      Trouver des réponses commence ici
                    </button>
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Rechercher dans notre centre d'aide..."
                      className="w-full px-4 py-2 border rounded-lg"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {itemsToDisplay.map(item => (
                      <div key={item.id} className="bg-white p-6 rounded-lg shadow-md my-4 cursor-pointer" onClick={() => handleItemClick(item.id)}>
                        <h2>
                          <p className="text-lg font-bold mb-2">{item.title}</p>
                          <p className="text-gray-700">{item.description}</p>
                        </h2>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <button onClick={() => setActiveHelp(null)} className="mb-4 text-blue-500">
                    &lt; Retour
                  </button>
                  {renderActiveHelp()}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;