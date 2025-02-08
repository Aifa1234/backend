const mongoose = require("mongoose");
const crypto = require("crypto");

const ProfileSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, sparse: true }, // sparse prevents index conflicts if id is missing
    name: { type: String, required: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    accountType: { type: String, default: "basic" },
    contactNo: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    age: { type: Number, default: 0 },
    aboutMe: { type: String, default: "" }, 
    role: { type: String, default: "basic" },
  },
  { timestamps: true }
);

// Generate unique ID before saving (Only when creating a new document)
ProfileSchema.pre("save", async function (next) {
  if (!this.id) {
    let isUnique = false;
    let uniqueId;

    while (!isUnique) {
      uniqueId = crypto.randomInt(100000, 999999); // Generates a 6-digit random number
      isUnique = !(await mongoose.model("Profile").exists({ id: uniqueId }));
    }

    this.id = uniqueId;
  }

  next();
});

module.exports = mongoose.model("Profile", ProfileSchema);
