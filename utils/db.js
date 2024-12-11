import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.databaseName = DB_DATABASE;
    this.db = null;
    this.connected = false;

    this.client.connect()
      .then(() => {
        this.connected = true;
	this.db = this.client.db(this.databaseName);
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err.message}`);
      });
  }

  isAlive() {
    return this.connected && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) return 0;
    const db = this.client.db(this.databaseName);
    return db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) return 0;
    const db = this.client.db(this.databaseName);
    return db.collection('files').countDocuments();
  }
  objectId(id) {
    return new ObjectId(id);
  }
}

const dbClient = new DBClient();
export default dbClient;
