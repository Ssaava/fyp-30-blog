import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { about, avatarUrl } = await request.json();

    if (about === undefined) {
      return NextResponse.json(
        { message: "About information is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Update user profile
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(authResult.userId) },
      {
        $set: {
          about,
          ...(avatarUrl && { avatarUrl }),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Also update author information in all posts
    if (result.modifiedCount > 0) {
      // Get the updated user
      const user = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(authResult.userId) },
          { projection: { name: 1 } }
        );

      // Update all posts by this author
      await db.collection("posts").updateMany(
        { "author._id": new ObjectId(authResult.userId) },
        {
          $set: {
            "author.name": user?.name,
          },
        }
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while updating profile" },
      { status: 500 }
    );
  }
}
