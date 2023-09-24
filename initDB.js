const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect(process.env.MongoDB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose connected");
    })
    .catch((err) => {
      console.log(err.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected to db...");
  });
  mongoose.connection.on("Error", (err) => {
    console.log(err.message);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose Connection is closed due to app termination...");
      process.exit(0);
    });
  });

  mongoose.connection.on("Dis connected", () => {
    console.log("Mongoose is Dis-Connected to db...");
  });
};
