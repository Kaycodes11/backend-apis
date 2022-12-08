import mongoose from "mongoose";

export default async function database(): Promise<void> {
  try {
    // Connect to 2 mongos servers
    // mongoose.connect('mongodb://mongosA:27501,mongosB:27501');

    // multiple connections
    // const conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);

    // This connection object (conn) is  then used to create and retrieve models. Models are always scoped to a single connection.
    // const UserModel = conn.model('User', userSchema);

    // when using multiple connection, then use export schema pattern than export model pattern

    // export model pattern as says export model then model connects to then default single connection
    // while as export schema pattern can be attached conn.model("User, UserSchema), conn2.model(....)

    /*
    const mongoose = require('mongoose');

    const conn = mongoose.createConnection(process.env.MONGODB_URI);
    conn.model('User', require('../schemas/user'));

    module.exports = conn;

// connections/slow.js
    const mongoose = require('mongoose');

    const conn = mongoose.createConnection(process.env.MONGODB_URI);
    conn.model('User', require('../schemas/user'));
    conn.model('PageView', require('../schemas/pageView'));

    module.exports = conn;
    
     */

    console.log(process.env.MONGO_URL as string);

    // if mongoose can't connect within 5ms then it will throw "timeout error" due to serverSelectionTimeoutMS
    await mongoose.connect(process.env.MONGO_URL as string, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error: any) {
    // this will handle just mongoose first time connection error
    if (error?.reason) {
      console.error(error.reason);
    } else {
      console.log(error.message);
    }
  }
}

// for any other error, use below and also for disconnected

// mongoose.connection.on('error', (err) => console.log(err.message))

// if any model uses index, then mongoose by default create its index by default (autoIndex: true)

// some useful connection events: connecting, connect, open , disconnecting, disconnected, close, reconnected, error, full setup, all

// if somehow mongoose connection has closed, how much time should it delay before restarting the connection?

// keepAliveInitialDelay is the number of milliseconds to wait before initiating keepAlive on the socket i.e. restating connection
// Right now, keepAlive is true by default since mongoose 5.2.0. so it should instantly by default or given delay.
