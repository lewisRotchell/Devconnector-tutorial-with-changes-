const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
  skills: {
    type: [String],
    required: [true, "Skills are required"],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, "Please enter a title"],
      },
      company: {
        type: String,
        required: [true, "Please enter a company"],
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: [true, "Please enter the start date"],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, "Please enter a school"],
      },
      degree: {
        type: String,
        required: [true, "Please enter your degree title"],
      },
      fieldofstudy: {
        type: String,
        required: [true, "Please enter your field of study"],
      },
      from: {
        type: Date,
        required: [true, "Please enter the start date"],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
