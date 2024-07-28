import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("requestId");

    console.log("Request ID:", requestId);

    if (!requestId) {
      return NextResponse.json(
        { error: "RequestId is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.API_KEY;

    const options = {
      method: "GET",
      headers: { "x-api-key": apiKey },
    };

    const url = `https://api.helloprint.com/rest/v1/orders/requestId=${requestId}`;
    console.log("Helloprint URL:", url);

    try {
      const res = await axios.get(url, options);
      console.log("Response from Helloprint:", res.data);

      return NextResponse.json({
        message: "Status",
        data: {
          ...res.data,
          status: res.data.status, 
        },
      });
    } catch (error: any) {
      console.error("Axios error:", error.message);
      console.error("Axios error details:", error.response?.data);
      return NextResponse.json({ error: error.response?.data?.error || error.message }, { status: error.response?.status || 500 });
    }
  } catch (error) {
    console.error(`Server error! ${error}`);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
