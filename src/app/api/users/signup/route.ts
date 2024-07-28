import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      username,
      email,
      password,
      confirmPassword,
      title,
      firstName,
      lastName,
      street,
      addressComplement,
      postalCode,
      city,
      country,
      phoneNumber,
      receiveSms,
      landlineNumber,
      occupation,
      annualExpense,
      newsletter,
      conditions,
    } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Validate confirmation password
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirmation password do not match" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      title,
      firstName,
      lastName,
      username,
      street,
      addressComplement,
      postalCode,
      city,
      country,
      phoneNumber,
      receiveSms,
      landlineNumber,
      email,
      password: hashedPassword,
      occupation,
      annualExpense,
      newsletter,
      conditions,
    });

    const savedUser = await newUser.save();

    // Send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
