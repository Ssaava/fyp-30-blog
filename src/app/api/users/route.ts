import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated || authResult.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}
