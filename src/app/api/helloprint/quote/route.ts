import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body from the request
    const body = await request.json();
    const items = body.items.map((item:any) => ({
      variantKey: item.variantKey,
      quantity: item.quantity,
      serviceLevel: item.serviceLevel
    }));

    const options = {
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY 
      },
      data: { items }
    };

    const res = await axios.post('https://api.helloprint.com/rest/v1/quotes', options.data, { headers: options.headers });
    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({ error: error.message, details: error.response.data }, { status: error.response.status });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
