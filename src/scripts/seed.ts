import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/group-blog";
const MONGODB_DB = process.env.MONGODB_DB || "group-blog";

console.log("MongoDB String: ", MONGODB_URI);

async function seed() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  console.log("Connected to MongoDB. Seeding database...");

  // Clear existing collections
  await db.collection("users").deleteMany({});
  await db.collection("posts").deleteMany({});

  // Create users
  const users = [
    {
      name: "SSENTEZA EMMANUEL",
      email: "emma@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    },
    {
      name: "KISSEJERE RASHID",
      email: "rashid@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "member",
    },
    {
      name: "SSEMAGANDA TRAVOR",
      email: "travor@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "member",
    },
    {
      name: "GUM PRICILLA",
      email: "gum@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "member",
    },
  ];

  const result = await db.collection("users").insertMany(users);
  console.log(`${result.insertedCount} users inserted`);

  // Create sample posts
  const adminId = result.insertedIds[0];
  const member1Id = result.insertedIds[1];
  const member2Id = result.insertedIds[2];

  const posts = [
    {
      title: "Welcome to Our Final Year Project Blog",
      content:
        "# Welcome to Our Blog\n\nThis is the first post on our final year project blog. We'll be sharing updates, progress, and insights as we work on our project.\n\n## Project Overview\n\nOur project aims to develop a collaborative platform for students to share their work and get feedback from peers and instructors.\n\n### Key Features\n\n- Real-time collaboration\n- Feedback system\n- Progress tracking\n\nStay tuned for more updates!",
      tags: ["welcome", "introduction", "project"],
      published: true,
      author: {
        _id: adminId,
        name: "Admin User",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Research Phase Complete",
      content:
        "We've completed the initial research phase of our project. Here are some key findings:\n\n- Existing solutions lack proper integration with academic workflows\n- Students prefer visual feedback over text-only comments\n- Mobile access is essential for today's students\n\nNext steps include creating wireframes and planning the technical architecture.",
      tags: ["research", "findings", "planning"],
      published: true,
      author: {
        _id: member1Id,
        name: "Member One",
      },
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      title: "Technical Architecture Decision",
      content:
        "After evaluating several options, we've decided on the following tech stack:\n\n```\n- Frontend: React with Next.js\n- Backend: Node.js with Express\n- Database: MongoDB\n- Authentication: JWT\n```\n\nThis combination gives us the flexibility and performance we need while allowing for rapid development.",
      tags: ["technical", "architecture", "development"],
      published: true,
      author: {
        _id: member2Id,
        name: "Member Two",
      },
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      updatedAt: new Date(Date.now() - 172800000),
    },
  ];

  const postsResult = await db.collection("posts").insertMany(posts);
  console.log(`${postsResult.insertedCount} posts inserted`);

  console.log("Database seeded successfully!");
  await client.close();
}

seed()
  .catch(console.error)
  .finally(() => console.log("Seed script completed"));
