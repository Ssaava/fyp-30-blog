/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("author");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit")
      ? Number.parseInt(searchParams.get("limit") as string)
      : undefined;

    const { db } = await connectToDatabase();

    // Build query
    const query: any = { published: true };

    if (authorId) {
      try {
        // Make sure it's a valid ObjectId
        query["author._id"] = new ObjectId(authorId);
      } catch (error) {
        console.error("Invalid author ID:", error);
        // If invalid ObjectId, return empty results
        return NextResponse.json([]);
      }
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    let postsQuery = db.collection("posts").find(query).sort({ createdAt: -1 });

    // Apply limit if specified
    if (limit) {
      postsQuery = postsQuery.limit(limit);
    }

    const posts = await postsQuery.toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await verifyAuth(request);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, tags, published = false } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(authResult.userId) },
        { projection: { name: 1 } }
      );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = {
      title,
      content,
      tags: tags || [],
      published,
      author: {
        _id: new ObjectId(authResult.userId),
        name: user.name,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);

    return NextResponse.json({
      message: "Post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the post" },
      { status: 500 }
    );
  }
}
