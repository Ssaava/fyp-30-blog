import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Build query based on user role
    let query = {};

    if (authResult.role === "admin") {
      // Admin can see all posts
      query = {};
    } else {
      // Regular users can only see their own posts
      query = { "author._id": new ObjectId(authResult.userId) };
    }

    const posts = await db
      .collection("posts")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}
