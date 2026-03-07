import mongoose from "mongoose";
import { DATABASE_URI } from "../../../config/config.service.js";


export const authenticationDB = async () => {
  try {
    const dbResult = await mongoose.connect(DATABASE_URI);
    console.log({ dbResult });
    console.log(`database connected successfully`);
  } catch (error) {
    console.log(`fail to connect on database ${error}`);
  }
};
