import mongoose from "mongoose";
import { ProviderEnum, RoleEnum } from "../../Utils/Enums/user.enums.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider === ProviderEnum.System; // returns required=true if provider=System
      },
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.User,
    },
    publicKey: {
      type: String,
      required: true,
    },

    privateKey: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    coverPhotos: {
      type: [String],
      required: false,
    },
    gallery:{
      type:[String],
      required:false
    },

    profileVisits: {
      type: Number,
      default: 0,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.System,
    },
   twoFAisEnabled:{
    type:Boolean,
    default:false
   }
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
