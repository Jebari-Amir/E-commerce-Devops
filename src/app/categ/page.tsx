import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const callouts = [
  {
    id: 'pull',
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
  },
  {
    id: 'chaussure',
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
  },
  {
    id: 'casquette',
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
  },

  {
    id: 'cartevisite',
    name: 'carte visite', 
    description: 'Les cartes de visite en plastique blanc PVC sont bien plus durables que les cartes qui utilisent un papier normal. Ce type de matériau rend les cartes de visites en plastique résistantes tout en restant souple',
    imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/6gyQXL0zx5Gwa2p7E9NfDW/89838ef7064bbbe7b133d9df8a11d3b1/PMS_BC_PLP.png',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
  },

  {
    id: 'flayer',
    name: 'flayer', 
    description: ' Ces supports marketing polyvalents peuvent être utilisés de différentes manières, qu il s agisse de les distribuer lors de salons professionnels ou d événements ou de les glisser dans des journaux ou des magazines',
    imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/1k3Atdav1C7XI6yEjY4Y8s/971a1ac856da604f9951fc2a4f9041f1/classic_flyer_PLP_horizontal.png',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
  },
  
];

export default function ExampleCategory() {
  const [categoryoverView, setCategoryoverView] = useState<any>([]);


 
  const fetchCategoryoverView = async () => {
    try {
      const res = await fetch('/api/products/categoryoverview');
      if (res.ok) {
        const data = await res.json();
        setCategoryoverView(data);
      } else {
        console.error('Failed to fetch category overview');
      }
    } catch (error) {
      console.error('Error fetching category overview:', error);
    }
  };

  useEffect(() => {
    fetchCategoryoverView()
    
  },[]);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 mt-6">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link href={`/categ/${callout.id}`}>
                    <p>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </p>
                  </Link>
                </h3>
                {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}