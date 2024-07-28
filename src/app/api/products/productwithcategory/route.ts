
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const options = {
      headers: { 'x-api-key': 'BUTOM7IGJ8QZUQ1JL5QM1DBRNAZEH0C1' }
    };
    const res = await axios.get('https://api.helloprint.com/rest/v1/categories/labels_all-labels-on-sheet_stickers', options);
    return NextResponse.json(res.data.data);
  } catch (error: unknown) { // Spécifier le type de l'objet error comme Error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}