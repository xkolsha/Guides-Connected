import { MongoClient } from "mongodb";

// Handler purpose: Get documents from specified collection in the query parameter
export async function handler(event) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  // Extract the collection name from query parameters
  const collectionName = event.queryStringParameters.collection;
  if (!collectionName) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Collection name is required" }),
    };
  }

  // List of allowed collections
  const allowedCollections = ["admins", "categories", "experts"];

  // Check if the requested collection is allowed
  if (!allowedCollections.includes(collectionName)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Invalid collection name" }),
    };
  }

  try {
    await client.connect();
    const collection = client
      .db("guidesConnectedDb")
      .collection(collectionName);
    const documents = await collection.find({}).toArray();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documents),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: e.message }),
    };
  } finally {
    await client.close();
  }
}
