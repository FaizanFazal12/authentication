function ConnectToMongoDb() {
  const mongoose = require("mongoose");
  const mongoAtlasUri = process.env.MONGODB_URL;

  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
}

export default ConnectToMongoDb;
