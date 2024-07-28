import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  
  try {
    let products;
    if (search) {
      // Effectuer une recherche partielle par nom insensible à la casse
      const query = { name: { $regex: search, $options: 'i' } };
      products = await Product.find(query);
    } else {
      // Récupérer tous les produits si aucun terme de recherche n'est fourni
      products = await Product.find();
    }
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
