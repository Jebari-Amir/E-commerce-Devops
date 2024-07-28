"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Stronavigation from '../components/storenavigation';
import Footer from '../components/footer';
import { CartProvider } from '../CartContext/page';


export default function RecieveProductSpCategoryPage() {
    const [prodCategoryData, setProdCategoryData] = useState<any>(null);
    const [localProducts, setLocalProducts] = useState<any[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const categoryParam = searchParams.get('category');
            setCategory(categoryParam);
        }
    }, []);

    useEffect(() => {
        if (category) {
            const fetchProdCategoryData = async () => {
                try {
                    const prodCategoryRes = await fetch(`/api/helloprint/productspecefiedcategory/${category}`);
                    if (prodCategoryRes.ok) {
                        const prodCategoryData = await prodCategoryRes.json();
                        setProdCategoryData(prodCategoryData);
                        fetchLocalProducts(prodCategoryData.data.products);
                    } else {
                        console.error('Failed to fetch Product specified category data');
                    }
                } catch (error) {
                    console.error('Error fetching Product specified category data:', error);
                }
            };

            fetchProdCategoryData();
        }
    }, [category]);

    const fetchLocalProducts = async (products: any) => {
        try {
            const productKeys = products.map((p: any) => p.productKey).join(',');
            const localProductsRes = await fetch(`/api/BD/product`);
            if (localProductsRes.ok) {
                const localProductsData = await localProductsRes.json();
                setLocalProducts(localProductsData);
            } else {
                console.error('Failed to fetch local products');
            }
        } catch (error) {
            console.error('Error fetching local products:', error);
        }
    };

    const combinedProducts = prodCategoryData ? prodCategoryData.data.products.map((product: any) => {
        const localProduct = localProducts.find(p => p.productKey === product.productKey);
        return {
            ...product,
            ...localProduct
        };
    }) : [];


     // Filter products based on the search query
     const filteredProducts = combinedProducts.filter((product:any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100">
            <CartProvider>
                <Stronavigation />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <div className="flex justify-between items-center mb-6">
                            <input
                                type="text"
                                placeholder="Search products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {filteredProducts.map((product: any, index: any) => (
                                <div key={index} className="group relative">
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                        {product.image && <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />}
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <Link href={`/ReceiveProduct?productKey=${product.productKey}`}>
                                            <h2 className="absolute inset-0"></h2>
                                        </Link>
                                        {product.name}
                                    </h3>
                                    {/* <p className="text-base font-semibold text-gray-900">Price: {product.price}</p>
                                    <p className="text-base font-semibold text-gray-900">Quantity: {product.quantity}</p> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </CartProvider>
        </div>
    );
}