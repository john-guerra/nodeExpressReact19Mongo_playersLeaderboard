import { MongoClient, ObjectId } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGO_URI || "mongodb://localhost:37017";

  function getCollection(collectionName) {
    console.log("connecting to Mongo ", uri.slice(0, 20));
    const client = new MongoClient(uri);
    const db = client.db("leaderboard");
    return [client, db.collection(collectionName)];
  }

  myDB.getPlayers = async ({ query = {}, page = 1, limit = 10 } = {}) => {
    let client, playersCol;

    try {
      [client, playersCol] = getCollection("players");
      console.log("querying players", query);
      const players = await playersCol
        .find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ votes: -1 })
        .toArray();
      console.log("got players", players.length);

      return players;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    } finally {
      client.close();
    }
  };

  myDB.updatePlayer = async (id, player) => {
    let client, playersCol;

    try {
      [client, playersCol] = getCollection("players");
      delete player._id;
      console.log("updating  player", { id, player });

      const result = await playersCol.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: player }
      );

      console.log("updated player", result);

      return result;
    } catch (error) {
      console.error("Error updating player:", error);
      throw error;
    } finally {
      client.close();
    }
  };
  return myDB;
}

const myDB = MyMongoDB();
export { myDB };
