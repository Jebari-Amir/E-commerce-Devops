import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { json } from 'stream/consumers';
import bcrypt from 'bcryptjs';

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const data = await request.json(); // Extraction du JSON de la requête

        // Assurer que les champs newPassword et confirmPassword sont présents et identiques
        if (data.newPassword && data.confirmPassword && data.newPassword === data.confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.newPassword, salt);
            data.password = hashedPassword; // Mettre à jour le champ de mot de passe avec le mot de passe haché
        } else {
            return NextResponse.json({ error: "New passwords do not match or are not provided." }, { status: 400 });
        }

        // Suppression des champs qui ne doivent pas être enregistrés directement
        delete data.newPassword;
        delete data.confirmPassword;

        const user = await User.findOneAndUpdate({_id: userId}, data, { new: true }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({
            message: "User updated successfully",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}