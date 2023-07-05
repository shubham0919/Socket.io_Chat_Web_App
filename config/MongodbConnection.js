const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_CONNECTION);

const db = mongoose.connection;

db.on("error", (err) => {
  if (err) {
    console.log("DB Not Connect...");
  }
});

db.once("open", () => console.log("DB Connected..."));

module.exports = db;
