  "use client"
  import React, { useState, useEffect } from 'react';
  import "./style.css";
  import Stronavigation from "../components/storenavigation";
  import RecieveProductVariantPage from '../receiveproductvariant/page';
  import { CartProvider } from '../CartContext/page';
  import CustomProduct from '../fabric/Fabric';
  import Carousel from '../components/coursel';

    
  const getDeliveryDate = (daysToAdd:any) => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + daysToAdd);
  
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return deliveryDate.toLocaleDateString('fr-FR', options);
  };
  
  const getLaterDate = (daysToAdd:any) => {
    const currentDate = new Date();
    const laterDate = new Date(currentDate);
    laterDate.setDate(currentDate.getDate() + daysToAdd + 1);
  
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return laterDate.toLocaleDateString('fr-FR', options);
  };






  const ProductComponent = () => {

    const [productData, setProductData] = useState<any>(null); 
    const [productKey, setProductKey] = useState<string | null>(null);
    const [variantData, setVariantData] = useState(null);
    const [selectedFillingHeight, setSelectedFillingHeight] = useState('');
    const [selectedFinishing, setSelectedFinishing] = useState('');
    const [showAllImagesModal, setShowAllImagesModal] = useState(false);
    const [quoteData, setQuoteData] = useState<any>(null);
    const [error, setError] = useState('');
    const [customizing, setCustomizing] = useState(false);

    const deliveryDate = getDeliveryDate(5);
    const laterDate = getLaterDate(5);

    const deliveryDatee = getDeliveryDate(7);
    const laterDatee = getLaterDate(7);

    const [selectedDate, setSelectedDate] = useState<string>(''); 

    const handleDateSelect = (date: string) => {
      setSelectedDate(date);
      updateURL(selectedColor, selectedPrintPosition, selectedSizes, date); // Mettre à jour l'URL avec la nouvelle date
    };





    const [mainImage, setMainImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedPrintPosition, setSelectedPrintPosition] = useState<string | null>(null);
    const [totalQuantity, setTotalQuantity] = useState<number>(1);
    const [quantityOptions, setQuantityOptions] = useState<any[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<{ [size: string]: number }>({
      S: 1,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0
    });

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const productKeyParam = searchParams.get('productKey');
        setProductKey(productKeyParam);
      }
    }, []);

    useEffect(() => {
      if (productKey) {
        const fetchProductData = async () => {
          try {
            const productRes = await fetch(`/api/helloprint/products/${productKey}`);
            if (productRes.ok) {
              const productData = await productRes.json();
              setProductData(productData); 
              fetchQuote(productData.data.presets[0]?.variantKey);





              if (productData.data.attributes && productData.data.attributes.colours && productData.data.attributes.colours.values.length > 0) {
                const firstColor = productData.data.attributes.colours.values[0][Object.keys(productData.data.attributes.colours.values[0])[0]].name.en;
                setSelectedColor(firstColor);
                const firstColorImage = productData.data.attributes.colours.values[0][Object.keys(productData.data.attributes.colours.values[0])[0]].image.en.url;
                setMainImage(firstColorImage);
              }



              if (productData.data.attributes && productData.data.attributes.color && productData.data.attributes.color.values.length > 0) {
                const firstColor = productData.data.attributes.color.values[0][Object.keys(productData.data.attributes.color.values[0])[0]].name.en;
                setSelectedColor(firstColor);
                const firstColorImage = productData.data.attributes.color.values[0][Object.keys(productData.data.attributes.color.values[0])[0]].image.en.url;
                setMainImage(firstColorImage);
              }



              if (productData.data.attributes && productData.data.attributes.printposition && productData.data.attributes.printposition.values.length > 0) {
                const firstPrintPosition = productData.data.attributes.printposition.values[0][Object.keys(productData.data.attributes.printposition.values[0])[0]].name.en;
                setSelectedPrintPosition(firstPrintPosition);
              }

             
              

            } else {
              console.error('Failed to fetch product data');
            }
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
      
        fetchProductData();
      }
    }, [productKey]); 


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


    useEffect(() => {
      // Vérifie si au moins deux images sont disponibles et définit la deuxième comme image principale par défaut
      if (productData?.images?.length > 1) {
        setMainImage(productData.images[1].url);
      } else if (productData?.images?.length === 1) {
        // S'il n'y a qu'une seule image disponible, utilisez-la comme image principale
        setMainImage(productData.images[0].url);
      }
    }, [productData]);
    

    // Fonction pour changer l'image principale
    const changeMainImage = (imageUrl:any) => {
      setMainImage(imageUrl);
    };

    const updateURL = (color: string | null, printPosition: string | null, sizes: { [size: string]: number }, date: string) => {
      const baseUrl = window.location.href.split('?')[0]; // Supprimer les paramètres de l'URL existante
      const newUrl = `${baseUrl}?color=${color}&printPosition=${printPosition}&S=${sizes.S}&M=${sizes.M}&L=${sizes.L}&XL=${sizes.XL}&XXL=${sizes.XXL}&date=${date}`;
      window.history.replaceState(null, '', newUrl); // Mettre à jour l'URL sans recharger la page
    };



    const handleColorSelect = (colorName: string, imageUrl: string) => {
      setSelectedColor(colorName);
      setMainImage(imageUrl);
          updateURL(colorName, selectedPrintPosition, selectedSizes );

    };

    const handlePrintPositionSelect = (position: string) => {
      setSelectedPrintPosition(position);
      
      updateURL(selectedColor, position, selectedSizes);

    };

    const handleSizeQuantityChange = (size: string, quantity: number) => {
      setSelectedSizes({ ...selectedSizes, [size]: quantity });
      setTotalQuantity(Object.values(selectedSizes).reduce((acc, curr) => acc + curr, 0));

          updateURL(selectedColor, selectedPrintPosition, selectedSizes);

    };

    const handleFillingHeightSelect = (fillingHeightName:any) => {
      setSelectedFillingHeight(fillingHeightName);
    };
    const handleFinishingSelect = (FinishingName:any) => {
      setSelectedFinishing(FinishingName);
    };
    

    const AllImagesModal = ({ isOpen , onClose, images }:any) => (
      isOpen ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: '1000' }}>
          {images.map((image:any, index:any) => (
            <img key={index} src={image[Object.keys(image)[0]].image.en.url} alt={image[Object.keys(image)[0]].name.en} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
          ))}
          <button onClick={onClose}>Close</button>
        </div>
      ) : null
    );

    console.log(productKey)


    
    const navigateToTestPage = () => {
      const params = new URLSearchParams({
        color: selectedColor || '',  
        printPosition: selectedPrintPosition || '',  
        S: selectedSizes.S.toString(),
        M: selectedSizes.M.toString(),
        L: selectedSizes.L.toString(),
        XL: selectedSizes.XL.toString(),
        XXL: selectedSizes.XXL.toString()
      }).toString();
      
      window.location.href = `/test?${params}`; 
    };
    


   



 
    const handleAddToCart = () => {
      const customDesign = localStorage.getItem('customDesign');
      if (productData && quoteData) {
        const priceInEuros = quoteData.costSummary.items.centAmountTotal / 100;
        const newProductToAdd = {
          name: productData.data.productName.en,
          image: customDesign || mainImage, // Utiliser l'image personnalisée si disponible
          quantity: totalQuantity,
          price: priceInEuros.toFixed(2),
          variantKey: productData.data.presets[0]?.variantKey,
          quote: {
            totalHT: quoteData.costSummary.items.centAmountTotal / 100,
            fraisDePort: quoteData.costSummary.items.centAmountTotal / 100,
            totalTTC: quoteData.costSummary.items.centAmountTotalInclTax / 100
          },
          selectedDate: selectedDate ,
          selectedColor: selectedColor, 
          selectedPrintPosition: selectedPrintPosition 
      
        };
    
        let cart = JSON.parse(localStorage.getItem("pannier") || "[]");
        cart.push(newProductToAdd);
        localStorage.setItem("pannier", JSON.stringify(cart));

        localStorage.removeItem('customDesign');

        window.location.href = '/CartComponent';
      } else {
        console.error('No product data or quote data available');
      }
    };
    
    


 
    useEffect(() => {
      const newTotalQuantity = Object.values(selectedSizes).reduce((acc, curr) => acc + curr, 0);
      setTotalQuantity(newTotalQuantity);
    }, [selectedSizes]);

    useEffect(() => {
      if (productData?.data?.presets[0]?.variantKey && totalQuantity > 0) {
        fetchQuote(productData.data.presets[0]?.variantKey);
      }
    }, [totalQuantity, productData]);
  


    const fetchQuote = async (variantKey: string) => {
      if (!variantKey) return;
      try {
        const response = await fetch('/api/helloprint/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: [{
              variantKey,
              quantity: totalQuantity,
              serviceLevel: 'standard'
            }]
          })
        });
        const data = await response.json();
        if (response.ok) {
          setQuoteData(data.data);
        } else {
          throw new Error(data.error || 'Failed to create quote');
        }
      } catch (error:any) {
        console.error('Error fetching quote:', error);
        setError(`Error: ${error.message}`);
      }
    };

  
  
    console.log("Rendering with quoteData:", quoteData);


    const handleCustomizeClick = () => {
      setCustomizing(true); 
    };





  





    return (
      <div className="product-page">
                  <CartProvider>    

        <Stronavigation />

       

        {productData && (
          <div className="bg-white">
            <div className="pt-6">
              <div className="mx-auto mt-1 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center">
                    <div className="w-1/2">
                      <h3 className="text-2xl font-bold text-royalblue-500 sm:pr-12 my-4"><strong>{productData.data.productName.en}</strong></h3>
                      {mainImage && (
                    <img
                      src={mainImage}
                      alt={productData.data.productName.en}
                      className="w-full h-auto object-cover group-hover:opacity-75 border-none"
                      style={{ maxHeight: '500px' }}
                    />
                  )}
                
                <Carousel images={productData.data.images} changeMainImage={changeMainImage} />

                    </div>
                    <div className="w-1/2 flex flex-col mx-4">







                    {productData.data.attributes.type && productData.data.attributes.type.values.length > 0 && (
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">Filling height: {selectedFillingHeight}</h3>
                                <ul className="mt-2 space-x-4 flex flex-wrap">
                                  {productData.data.attributes.type.values.map((value: any, index: number) => {
                                    const key = Object.keys(value)[0];
                                    const typeValue = value[key];
                                    return (
                                      <li key={index} 
                                          className="flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => handleFillingHeightSelect(typeValue.name.en)}
                                          onMouseOver={() => handleFillingHeightSelect(typeValue.name.en)} // Optionnel, si vous voulez aussi changer au survol
                                      >
                                        {typeValue.image && typeValue.image.en && (
                                          <img
                                            src={typeValue.image.en.url}
                                            alt={typeValue.name.en}
                                            className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                                          />
                                        )}
                                        <span dangerouslySetInnerHTML={{ __html: typeValue.name.en }} />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}



                            

                            {productData.data.attributes.finishing && productData.data.attributes.finishing.values.length > 0 && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 my-4">Finishing: {selectedFinishing}</h3>
                                <ul className="mt-2 space-x-4 flex flex-wrap">
                                  {productData.data.attributes.finishing.values.map((value: any, index: number) => {
                                    const key = Object.keys(value)[0];
                                    const typeValue = value[key];
                                    return (
                                      <li key={index} 
                                          className="flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => handleFinishingSelect(typeValue.name.en)}
                                          //onMouseOver={() => handleFinishingSelect(typeValue.name.en)} 
                                      >
                                        {typeValue.image && typeValue.image.en && (
                                          <img
                                            src={typeValue.image.en.url}
                                            alt={typeValue.name.en}
                                            className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                                          />
                                        )}
                                        <span dangerouslySetInnerHTML={{ __html: typeValue.name.en }} />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}






{productData.data.attributes.size && productData.data.attributes.size.values.length > 0 && (
  <div>
    <h3 className="text-lg font-medium text-gray-900">{productData.data.attributes.size.name.en}</h3>
    <div className="mt-4 flex flex-wrap gap-4">
      {productData.data.attributes.size.values.map((size:any, index:any) => {
        const sizeKey = Object.keys(size)[0]; 
        const sizeDetails = size[sizeKey]; 
        return (
          <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            <span style={{ fontSize: '14px', color: '#333' }}>{sizeDetails.name.en}</span>
          </div>
        );
      })}
    </div>
  </div>
)}




{productData.data.attributes.option && productData.data.attributes.option.values.length > 0 && (
  <div>
    <h3 className="text-lg font-medium text-gray-900 my-4">{productData.data.attributes.option.name.en}</h3>
    <div className="mt-4 flex flex-wrap gap-4">
      {productData.data.attributes.option.values.map((option:any, index:any) => {
        const optionKey = Object.keys(option)[0]; // Gets the key for the current option (e.g., "nooption" or "withblower")
        const optionDetails = option[optionKey]; // Gets the details for the current option
        return (
          <div key={index} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-36 h-36">
            {optionDetails.image && optionDetails.image.en && (
              <img
                src={optionDetails.image.en.url}
                alt={(optionDetails.name.en || '') + ' option'}
                className="w-26 h-40 object-cover mb-2"
              />
            )}
            <span className="text-sm font-medium text-gray-700">{optionDetails.name.en}</span>
            
          </div>
        );
      })}
    </div>
  </div>
)}



                                



                    {productData.data.attributes.colours && productData.data.attributes.colours.values.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Colours:</h3>
                            <ul className="mt-2 space-x-4 flex flex-wrap">
                              {productData.data.attributes.colours.values.slice(0, 4).map((value:any, index:any) => (
                                <li key={index}>
                                  <button
                                    className="flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none"
                                    onClick={() => handleColorSelect(value[Object.keys(value)[0]].name.en, value[Object.keys(value)[0]].image.en.url)}
                                  >
                                    <img
                                      src={value[Object.keys(value)[0]].image.en.url}
                                      alt={value[Object.keys(value)[0]].name.en}
                                      className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                                    />
                                    {value[Object.keys(value)[0]].name.en}
                                  </button>
                                </li>
                              ))}
                              {productData.data.attributes.colours.values.length > 5 && (
                                <li>
                                  <button onClick={() => setShowAllImagesModal(true)}>
                                    + More
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        


                    {productData.data.attributes.color && productData.data.attributes.color.values.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Colours:</h3>
                            <ul className="mt-2 space-x-4 flex flex-wrap">
                              {productData.data.attributes.color.values.slice(0, 4).map((value:any, index:any) => (
                                <li key={index}>
                                  <button
                                    className="flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none"
                                    onClick={() => handleColorSelect(value[Object.keys(value)[0]].name.en, value[Object.keys(value)[0]].image.en.url)}
                                  >
                                    <img
                                      src={value[Object.keys(value)[0]].image.en.url}
                                      alt={value[Object.keys(value)[0]].name.en}
                                      className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                                    />
                                    {value[Object.keys(value)[0]].name.en}
                                  </button>
                                </li>
                              ))}
                              {productData.data.attributes.color.values.length > 5 && (
                                <li>
                                  <button onClick={() => setShowAllImagesModal(true)}>
                                    + More
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}






                      {productData.data.attributes.printposition && productData.data.attributes.printposition.values.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mt-6">Print Positions:</h3>
                          <ul className="mt-2 space-x-4 flex flex-wrap">
                            {productData.data.attributes.printposition.values.map((position: any, index: number) => {
                              const positionKey = Object.keys(position)[0];
                              const positionData = position[positionKey];
                              const isSelected = selectedPrintPosition === positionData.name.en;
                              
                              return (
                                <li key={index}>
                                  <button
                                    className={`flex flex-col items-center justify-center w-13 h-17 text-sm font-medium text-blue-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none ${
                                      isSelected ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handlePrintPositionSelect(positionData.name.en)}
                                  >
                                    {positionData.image && positionData.image.en && (
                                      <img
                                        src={positionData.image.en.url}
                                        alt={positionData.name.en}
                                        className="w-24 h-24 object-cover group-hover:opacity-75 border-none"
                                      />
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      <h3 className="text-lg font-medium text-gray-900 mt-6">Sizes:</h3>
                      <div className="mt-2 flex space-x-4">
                        {["S", "M", "L", "XL", "XXL"].map((size: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="text"
                              placeholder="0"
                              value={selectedSizes[size]}
                              onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value))}
                              className="w-12 px-4 py-2 border border-gray-200 rounded mr-2"
                            />
                            <label htmlFor={`size-${size}`} >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>





                      <h3 className="text-lg font-medium text-gray-900 mt-6">Estimated delivery date</h3>
<div className="rectangle-container mt-4">
  <div className="rectangle" onClick={() => handleDateSelect(deliveryDate)}>
    {deliveryDate}
    <br />
    <span className="text-sm text-gray-500">Au plus tard le {laterDate}</span>
  </div>
  <div className="rectangle" onClick={() => handleDateSelect(deliveryDatee)}>
    {deliveryDatee}
    <br />
    <span className="text-sm text-gray-500">Au plus tard le {laterDatee}</span>
  </div>
</div>





                          
{/* Quote Price Display */}



        {quoteData && (
              <div className="quote-price-display">
                <h3 className="text-lg font-medium text-gray-900">Estimated Price:</h3>
                <p className="text-xl font-bold">{quoteData.costSummary.items.centAmountTotal / 100} €</p>
              </div>
            )}





                     <button onClick={navigateToTestPage} className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-md px-6 py-3 transition-colors mt-4 w-full my-4">
  test Variant
</button>

<button onClick={handleAddToCart} className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-md px-6 py-3 transition-colors mt-4 w-full my-4">
        Ajout au panier
      </button>


      {/* <button onClick={() => setCustomizing(true)}>Créer votre design</button>
{customizing && <CustomDesign imageUrl={mainImage} />} */}

<button className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-md px-6 py-3 transition-colors mt-4 w-full my-4">Créer votre design</button>
        
<div>
            <button onClick={handleCustomizeClick}>Créer votre design</button>
            {customizing && <CustomProduct imageSrc={mainImage} />}
          </div>
          
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
              </CartProvider>

      </div>
      
    );
  };

  export default ProductComponent;
