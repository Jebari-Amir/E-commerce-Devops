import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/keys';

function Impression() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <footer className="bg-white-100 dark:bg-white-700">
      <div className="mx-auto w-full max-w-screen-xl">
        <h1 className="text-lg font-bold mb-4 text-blue-900">L'impression en ligne encore plus facile</h1>

        <p>
          Vous recherchez un moyen simple et rapide de créer et d'imprimer vos supports en ligne ? Ne cherchez pas plus loin, HelloPrint est l'idéal pour tous vos types d'impressions en ligne. Nous proposons une large gamme de produits imprimés pas chers, tout cela sur une plateforme d’impression qui est simple et facile à utiliser. Ouvert 7 jours sur 7, nous apporterons vos supports jusqu’à votre porte et vous offrons une livraison aux délais raisonnables !
          {isExpanded && (
            <>
              <br/><br/>
              <strong>Quels types de produits pouvez-vous imprimer en ligne ?</strong><br/>
              Certains de nos produits phares incluent des produits de papeterie et de promotions, comme des flyers, des cartes de visite, des brochures ou des banderoles. Ces produits abordables et simples à imprimer sont efficaces pour le développement de votre entreprise ou pour vos besoins personnels. Voici une liste de certains de nos produits phares : 
              - Cartes de visite
              - Flyers
              - Brochures
              - Affiches
              - T-shirts
              - Banderoles
              - Tasses
              - Produits photos
              - Calendriers et bien plus encore !<br/><br/>

              <strong>Comment commander en ligne sur HelloPrint ?</strong><br/>
              Rien de plus simple ! Ce que vous devez faire, c'est suivre pas-à-pas le processus de commande et soumettre votre design en haute définition. Voici les étapes à suivre :<br/>
              1. Sélectionnez le produit que vous souhaitez commander en ligne.<br/>
              2. Choisissez votre délai de livraison idéal.<br/>
              3. Choisissez votre mode de paiement et passez votre commande.<br/>
              4. Téléchargez vos fichiers et personnalisez votre produit en ligne et nous nous occupons du reste.<br/><br/>
              N'oubliez pas de suivre nos conseils avant de télécharger votre design. Vous n'avez pas de logiciel de design ? Alors, essayez notre propre outil de design en ligne, c'est simple, rapide et gratuit ! Vous ne pouvez pas vous tromper en commandant vos impressions sur HelloPrint. Rejoignez plus de 500 000 clients satisfaits qui ont bénéficié de nos produits et services.
            </>
          )}
        </p>
        <button onClick={handleToggle} className="text-blue-600 underline">
          {isExpanded ? "Afficher moins" : "En savoir plus"}
        </button>
      </div>
    </footer>
  );
}

export default Impression;
