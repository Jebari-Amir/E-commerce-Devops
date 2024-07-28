import { NextRequest, NextResponse } from 'next/server'
import ProductVariant from '@/models/productVariantModel'


export async function GET(request: NextRequest) {
    try {
      const productVariants = await ProductVariant.find();
  
      return NextResponse.json(productVariants);
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }