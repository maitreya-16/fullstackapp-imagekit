import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ error: "Email and Password Both required" }, { status: 400 })
        }
        await connectToDatabase();
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User is already registered" }, { status: 400 });
        }
        await User.create({
            email,
            password
        })

        return NextResponse.json({ message: "User successfully registered" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "Failed to register User",err }, { status: 400 })
    }
}