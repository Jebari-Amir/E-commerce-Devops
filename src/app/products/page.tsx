"use client"
import React, { useEffect, useState } from 'react';
import Stronavigation from '../components/storenavigation';
import Footer from '../components/footer';
import Link from 'next/link';

const Products = [
{
id: 'mrawel',
callout:'pull',
name: 'Earthen Bottle',
href: '#',
price: '$48',
imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
},
{
id: 'mrawelnos',
callout:'pull',
name: 'Nomad Tumbler',
href: '#',
price: '$35',
imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
},
{
id: 'sabat',
callout:'chaussure',
name: 'Focus Paper Refill',
href: '#',
price: '$89',
imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
},
{
id: 'chapeau',
callout:'casquette',
name: 'Machined Mechanical Pencil',
href: '#',
price: '$35',
imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
},


{
  id: 'crtvs',
  callout: 'cartevisite',
  name: 'Cartes en PVC blanc',
  options: [
    {
      option: 'PVC blanc brillant ou mat',
     
    },
    {
      option: 'Durables et waterproof',

      
    }
  ],
  price: '$35',
  descprtion:"500 pièces pour", 
  Caractéristiques: "Matériaux 760μ PVC blanc brillant | 760μ PVC blanc mat Technique d'impression Numérique | Offset",
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg ',
  imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
},



{
  id: 'crtenbois',
  callout: 'cartevisite',
  name: 'Cartes de visite en bois',
  options: [
    {
      option: 'Fabriquées en bois recyclé',
     
    },
    {
      option: 'Durables et résistantes',

      
    }
  ],
  price: '181.99£',
  descprtion:"500 pièces pour", 
  imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/5IeyvlYrkSqZZbKEtQExtg/74c8c4367e5cdc126f8350bb0f387e60/Wood_BC_PLP.png',
  imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
},


{
  id: 'flayer2plis3volets',
  callout: 'flayer',
  name: 'Dépliant 2 plis accordéon - 3 volets',
  options: [
    {
      option: 'Idéal pour les présentations ',
     
    },
    {
      option: '6 faces',

      
    }
  ],
  price: '54.99£',
  descprtion:"1000 pièces pour", 
  imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/3AQADINSdDf7EtCQb3Wz12/66e308099ba380b9087d0ec4a8a9e65a/Folded_Leaflet_Bundle_Item_zigzag_fold.png',
  imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
},

]

export default function ExampleCategory() {

  const [product, setProduct] = useState<any>([]);


  const fetchProduct = async () => {
    try {
      const res = await fetch('/api/products/product');
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        console.error('Failed to fetch product ');
      }
    } catch (error) {
      console.error('Error fetching product :', error);
    }
  };
  
  useEffect(() => {
    fetchProduct()
    
  },[]);
  





    return (
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Produits</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {Products.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link href={`/products/${callout.id}`}>
                      <p>
                        <span className="absolute inset-0" />
                        {callout.name}
                      </p>
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }