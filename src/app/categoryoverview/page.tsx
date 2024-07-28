"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RecieveCategorysPage = () => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [localCategories, setLocalCategories] = useState<any>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryRes = await fetch('/api/helloprint/categorys');
        if (categoryRes.ok) {
          const categoryData = await categoryRes.json();
          setCategoryData(categoryData.data);
        } else {
          console.error('Failed to fetch category data');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchLocalCategories = async () => {
      try {
        const localCategoryRes = await fetch('/api/category');
        if (localCategoryRes.ok) {
          const localCategoriesData = await localCategoryRes.json();
          setLocalCategories(localCategoriesData);
        } else {
          console.error('Failed to fetch local category data');
        }
      } catch (error) {
        console.error('Error fetching local category data:', error);
      }
    };

    fetchLocalCategories();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categoryData
              .filter(category => localCategories && localCategories.some((localCat: any) => localCat.categoryKey === category))
              .map((category, index) => {
                const localCategory = localCategories.find((localCat: any) => localCat.categoryKey === category);
                return (
                  <div key={index} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      {localCategory && <img src={localCategory.image} alt={localCategory.name} className="h-full w-full object-cover object-center" />}
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <Link as={`/ReceiveProductsSpCategory?category=${category}`} href={`/ReceiveProductsSpCategory/${category}`}>
                        <h2 className="absolute inset-0"></h2>
                      </Link>

                      {localCategory && <p className="text-base font-semibold text-gray-900">{localCategory.name}</p>}

                    </h3>
                    {localCategory && <p className="text-base font-semibold text-gray-900">{localCategory.description}</p>}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecieveCategorysPage;
