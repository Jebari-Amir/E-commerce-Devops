import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { categoryKey: string } }
) {
  try {
    const options = {
      method: "GET",
      headers: { "x-api-key": process.env.API_KEY },
    };

    try {
      const res = await axios.get(
        `https://api.helloprint.com/rest/v1/categories/${context.params.categoryKey}`,
        options
      );

      return NextResponse.json({
        message: "Products specified Categories list",
        data: res.data.data,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } catch (error) {
    console.log(`Error! ${error}`);
  }
}