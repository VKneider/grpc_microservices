import pkg from 'pg';
import sentences from './DBSentences.js';
const { Pool } = pkg;

class Database {
  constructor(config) {
    this.sentences = sentences;
    this.pool = new Pool(config);
  }

  executeQuery = async (query, props, client) => {
    try {
        let selectedClient;
        if(client){
            selectedClient = client;
        }else{
            selectedClient = this.pool;
        }
      const res = await selectedClient.query(this.sentences[query], props);
      return res.rows;
    } catch (e) {
      console.log(e);
    }
  };

  startTransaction = async () => {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      return client;
    } catch (error) {
      await client.release();
      throw error;
    }
  };

  commitTransaction = async (client) => {
    try {
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.release();
    }
  };

  rollbackTransaction = async (client) => {
    try {
      await client.query('ROLLBACK');
    } finally {
      await client.release();
    }
  };

  customQuery = async (query) => {
    try {
      const res = await this.pool.query(query);
      return { res, status: 'SUCCESS' };
    } catch (e) {
      console.log(e);
      return { status: 'ERROR', res: e.message };
    }
  };
}

const db = new Database({
  user: 'postgres',
  host: 'localhost',
  database: 'grpc',
  password: 'postgres',
  port: 5433,
});

export default db;