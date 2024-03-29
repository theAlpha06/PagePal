import Express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema/schema.js";
import cors from "cors";

mongoose.connect("mongodb+srv://ravidemo3:ustime123@cluster0.6f3zkxn.mongodb.net/graphql");

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

const app = Express();
app.use(cors({
  origin: "*"
}))

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});