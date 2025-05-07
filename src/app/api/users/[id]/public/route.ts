import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const { db } = await connectToDatabase();

    // Validate ObjectId
    let userId: ObjectId;
    try {
      userId = new ObjectId(id);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

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
