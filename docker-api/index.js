const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://db:27017/counts"; // Use 'db' instead of 'localhost' or '127.0.0.1'// Ensure the port is correct
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to database");
    const database = client.db("counts");
    const collection = database.collection("counts");

    app.get("/counts", async (_, res) => {
      const counts = await collection.find({}).toArray();
      res.json(counts);
    });

    app.post("/counts", async (req, res) => {
      const { count } = req.body;
      // set or update count
      await collection.updateOne(
        { _id: 1 },
        { $set: { count: count } },
        { upsert: true }
      );
      res.status(201).send();
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
}

main();

app.get("/", (_, res) => {
  // 'req' is not used, so it's replaced with '_'
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
