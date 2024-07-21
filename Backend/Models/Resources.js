import { Schema, model } from "mongoose";

const ResourceSchema = new Schema({
  ResourceTitle: {
    type: String,
    required: true,
  },
  ResourceLink: {
    type: String,
    required: true,
    unique: true,
  },
  ResourceCategory: {
    type: String,
    required: true,
  },
  ResourceType: {
    type: String,
    required: true,
  },
  ResourceDescription: {
    type: String,
    required: true,
  },
  Posteremail: {
    type: String,
    required: true,
  },
  Postername: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default model("Resources", ResourceSchema);
