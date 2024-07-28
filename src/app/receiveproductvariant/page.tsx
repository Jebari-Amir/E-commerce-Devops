"use client"
import React, { useState, useEffect } from 'react';

export default function RecieveProductVariantPage() {
  const [prodVariant, setProdVariant] = useState<any>(null); 
  const [productData, setProductData] = useState<any>(null); 
  const [variantData, setVariantData] = useState(null);



  useEffect(() => {
    if (productData) {
      const fetchVariantData = async () => {
        try {
         
  
          const includeAvailableQtys = true;
  
          const url = `/api/helloprint/products/${productData.productKey}/variants?sku=${productData.sku}&includeAvailableQtys=${includeAvailableQtys}`;
          const response = await fetch(url);
  
          if (response.ok) {
            const data = await response.json();
            setVariantData(data); 
          } else {
            console.error('Failed to fetch variants');
          }
        } catch (error) {
          console.error('Error fetching variants:', error);
        }
      };
  
      fetchVariantData();
    }
  }, [productData]);


  return (
    <div className="product-page">
   
    </div>
  );
}

