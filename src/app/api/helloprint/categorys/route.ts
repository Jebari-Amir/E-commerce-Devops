import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const options = {
      method: "GET",
      headers: { "x-api-key": process.env.API_KEY },
    };

    try {
      const res = await axios.get(
        `https://api.helloprint.com/rest/v1/categories`,
        options
      );
      
      // Récupérer les données de catégories
      const categoriesData = res.data.data;

      // Retourner les données de catégories
      return NextResponse.json({
        message: "Categories list",
        data: categoriesData,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } catch (error) {
    console.log(`Error! ${error}`);
  }
}
