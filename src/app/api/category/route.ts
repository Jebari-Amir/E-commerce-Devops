import { NextRequest, NextResponse } from 'next/server'
import Category from '@/models/categoryModel'

export async function POST(request: NextRequest) {
  try {
    const { categoryKey, name, image }: any = request.body;

    const rec = await Category.create({
      categoryKey,
      name,
      image,
    });

    // Utilise NextResponse pour envoyer une réponse HTTP
    return NextResponse.json(rec);
  } catch (error: any) {
    // Utilise NextResponse pour envoyer une réponse HTTP
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    // Récupère toutes les catégories depuis la base de données
    const categories = await Category.find();

    // Utilise NextResponse pour envoyer une réponse HTTP avec les données des catégories
    return NextResponse.json(categories);
  } catch (error: any) {
    // En cas d'erreur, renvoie une réponse avec le message d'erreur et le statut 500
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}