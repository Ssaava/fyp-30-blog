import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();

    // check if Author id Exists
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const userId = new ObjectId(id);

    // Get user with public information only
    const user = await db.collection("users").findOne(
      { _id: userId },
      {
        projection: {
          // Exclude sensitive fields
          password: 0,
          email: 0,
        },
      }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get user's published posts count
    const postsCount = await db.collection("posts").countDocuments({
      "author._id": userId,
      published: true,
    });

    return NextResponse.json({
      ...user,
      postsCount,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user information" },
      { status: 500 }
    );
  }
}
