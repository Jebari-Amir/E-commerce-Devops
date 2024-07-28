import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request:any) {
    try {
        const orderDetails = await request.json();

        const response = await axios.post('https://api.helloprint.com/rest/v1/orders', orderDetails, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        return NextResponse.json(response.data);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
