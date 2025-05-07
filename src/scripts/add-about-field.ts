import { MongoClient } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/group-blog";
const MONGODB_DB = process.env.MONGODB_DB || "group-blog";

console.log("MongoDB String: ", MONGODB_URI);

async function addAboutField() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  console.log("Connected to MongoDB. Adding 'about' field to users...");

  // Update all users to add the about field if it doesn't exist
  const result = await db.collection("users").updateMany(
    { about: { $exists: false } },
    {
      $set: {
        about: "No information provided yet.",
        avatarUrl:
          "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg",
      },
    }
  );

  console.log(
    `Updated ${result.modifiedCount} users with default 'about' field`
  );

  await client.close();
  console.log("Done!");
}

addAboutField()
  .catch(console.error)
  .finally(() => console.log("Migration script completed"));
