import { NextRequest, NextResponse } from 'next/server'
import Order from '@/models/orderModel'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import mongoose from "mongoose";

connect();


// export async function GET(request: NextRequest) { 
//     try {
//       const orders = await Order.find();
  
//       return NextResponse.json(orders);
//     } catch (error: any) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   }


export async function GET(request: NextRequest) {
  try {
      // Extraire l'ID de l'utilisateur de l'URL ou autre mécanisme (comme un token JWT)
      const userId = request.nextUrl.searchParams.get('userId');

      // Vérifier si l'ID utilisateur a été fourni
      if (!userId) {
          return NextResponse.json({ message: "User ID is required" }, { status: 400 });
      }

      // Convertir userId en ObjectId valide pour la recherche
      const userObjectId = new mongoose.Types.ObjectId(userId);

      // Rechercher les commandes associées à cet utilisateur
      const orders = await Order.find({ userx: userObjectId }).populate('userx');

      // Retourner les commandes trouvées ou un message si aucune commande n'est trouvée
      if (orders.length > 0) {
          return NextResponse.json(orders);
      } else {
          return NextResponse.json({ message: "No orders found for this user" }, { status: 404 });
      }
  } catch (error:any) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { orderReferenceId, userx , items,  totalHT, taxes, Orderstatus, shippingCost, totalTTC, city, postalCode, street, country, phoneNumber, DateCommande, requestId } = await request.json();

    const newOrder = new Order({
      orderReferenceId,
      items,
      Orderstatus,
      tva: taxes,
      totalht: totalHT,
      fraisport: shippingCost,
      totalttc: totalTTC,
      shipping: [{ 
        street,
        addressComplement: user.addressComplement, 
        postalCode,
        city,
        country,
        phoneNumber,
      }],
      userId: userId, 
      DateCommande: new Date(),
      userx: userx,
      requestId: requestId
    });

    await newOrder.save();

    return NextResponse.json({ message: "Order created successfully", data: newOrder }, { status: 201 });
  } catch (error:any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}