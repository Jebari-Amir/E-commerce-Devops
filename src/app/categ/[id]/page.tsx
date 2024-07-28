"use client"
import React, { useEffect } from 'react';
import Stronavigation from '../../components/storenavigation';
import Footer from '../../components/footer';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const allProducts = [
    {
      id: 'mrawel',
      callout:'pull',
      name: 'Earthen Bottle',
      href: '#',
      quantite:2,
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 'mrawelnos',
      callout:'pull',
      name: 'Nomad Tumbler',
      href: '#',
      quantite:2,
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 'sabat',
      callout:'chaussure',
      name: 'Focus Paper Refill',
      href: '#',
      quantite:2,
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 'chapeau',
      callout:'casquette',
      name: 'Machined Mechanical Pencil',
      href: '#',
      quantite:2,
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
      price: '229,99£',
      descprtion:"500 pièces pour", 
      imageSrc: '//contentful.helloprint.com/wm1n7oady8a5/7eYfGXcZO0aoIR4XB50BFW/cb5148b1f6fea63ddca09e8343b742d4/PVC_BC_PLP.png',
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


  const CategoryProductsPage = ({ params }: any) => {
    const [searchValue, setSearchValue] = useState('');
    const [sortOption, setSortOption] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productWithCategory, setProductWithCategory] = useState<any>([]);

  
    const filteredProducts = allProducts.filter(product =>
      product.callout === params.id && product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOption === 'price') {
        const priceA = parseFloat(a.price.slice(1));
        const priceB = parseFloat(b.price.slice(1));
        if (sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      }
     
      return 0;
    });


    const fetchProductWithCategory = async () => {
      try {
        const res = await fetch('/api/products/productwithcategory');
        if (res.ok) {
          const data = await res.json();
          setProductWithCategory(data);
        } else {
          console.error('Failed to fetch Product With Category');
        }
      } catch (error) {
        console.error('Error fetching Product With Category:', error);
      }
    };
  
    useEffect(() => {
      fetchProductWithCategory()
      
    },[]);
  
    return (
      <div className="bg-white">
        <Stronavigation />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
              placeholder="Rechercher des produits par nom"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
  

  
            <select
              value={sortOrder}
              onChange={event => setSortOrder(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="asc">ascending price</option>
              <option value="desc">decreasing price</option>
            </select>
          </div>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <p className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-smtext-gray-700">{product.name}</h3>
                  {product.options && Array.isArray(product.options) && product.options.length > 0 && (
        <div className="mt-2">
            <ul className="mt-1 text-sm text-gray-600">
            {product.options.map(material => (
              <li key={material.option}>
                 <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" /> {/* Icône de validation */}
                {material.option}

              </li>
            ))}
          </ul>
        </div>

      )}
      <br />

{product.descprtion && (
  <p className="text-sm text-gray-500">{product.descprtion}</p>
)}
<h2 className="mt-1 text-lg font-medium text-gray-900">{product.price}</h2>

    </p>
  </Link>
))}
          </div>
        </div>
        <Footer />
      </div>
    )
  };
  
  export default CategoryProductsPage;