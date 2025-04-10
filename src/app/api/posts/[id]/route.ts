import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    const post = await db.collection("posts").findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, tags, published } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Check if post exists
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Check if user is authorized to update this post
    if (
      authResult.role !== "admin" &&
      post.author._id.toString() !== authResult.userId
    ) {
      return NextResponse.json(
        { message: "You are not authorized to update this post" },
        { status: 403 }
      );
    }

    const updateData = {
      title,
      content,
      tags: tags || [],
      published: published !== undefined ? published : post.published,
      updatedAt: new Date(),
    };

    await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Check if post exists
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Check if user is authorized to delete this post
    if (
      authResult.role !== "admin" &&
      post.author._id.toString() !== authResult.userId
    ) {
      return NextResponse.json(
        { message: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

    await db.collection("posts").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}
