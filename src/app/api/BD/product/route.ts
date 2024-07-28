import { NextRequest, NextResponse } from 'next/server'
import Product from '@/models/productModel'


export async function GET(request: NextRequest) {
    try {
      const products = await Product.find();
  
      return NextResponse.json(products);
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }