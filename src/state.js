import {MongoClient} from 'mongodb';

const mongoUrl = process.env.MONGOURL || 'mongodb://localhost:27017/example_app'

let conn

let appState = {
    getConnection: () => {
        conn = conn || MongoClient.connect(mongoUrl);
        return conn
    }
}

export default appState