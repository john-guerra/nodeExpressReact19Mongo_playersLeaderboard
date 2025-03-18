import { MongoClient, ObjectId } from "mongodb";

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
  }
}

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGO_URI || "mongodb://localhost:37017";
  let client = null;

  async function getConnection() {
    if (!client) {
      client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
    }
    return client;
  }

  async function getCollection(collectionName) {
    try {
      const client = await getConnection();
      const db = client.db("leaderboard");
      return db.collection(collectionName);
    } catch (error) {
      throw new DatabaseError(`Failed to get collection: ${error.message}`, 'DB_CONNECTION_ERROR');
    }
  }

  myDB.getPlayers = async ({ query = {}, page = 1, limit = 10 } = {}) => {
    try {
      const playersCol = await getCollection("players");
      const players = await playersCol
        .find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ votes: -1 })
        .toArray();

      return players;
    } catch (error) {
      throw new DatabaseError(`Failed to fetch players: ${error.message}`, 'FETCH_ERROR');
    }
  };

  myDB.updatePlayer = async (id, player) => {
    try {
      const playersCol = await getCollection("players");
      delete player._id;

      const result = await playersCol.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: player }
      );

      if (result.matchedCount === 0) {
        throw new DatabaseError('Player not found', 'NOT_FOUND');
      }

      return result;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError(`Failed to update player: ${error.message}`, 'UPDATE_ERROR');
    }
  };

  myDB.close = async () => {
    if (client) {
      await client.close();
      client = null;
    }
  };

  return myDB;
}

const myDB = MyMongoDB();
export { myDB, DatabaseError };
