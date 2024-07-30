import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userschema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxlenght: 140

    },

    email: {
      type: String,
      minlenght: 10,
      maxlenght: 50,
      require: true,
      unique: true,
      VarDate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid Email"
      }

    },
    contact: {
      type: Number,
      require: true,
      unique: true,
      minlenght: 10,
      maxlenght: 10
    },
    city: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      maxlenght: 3
    }
  }
)

const user = model("user", userschema);
export default user;