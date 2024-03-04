const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formantSchema = new Schema({
  nickname: {
    type: String,
    ref: "User",
  },
  languages: {
    type: String,
    ref: "User",
  },
  formants: {
    type: {
      a: {
        f1: Number,
        f2: Number,
      },
      eo: {
        f1: Number,
        f2: Number,
      },
      o: {
        f1: Number,
        f2: Number,
      },
      u: {
        f1: Number,
        f2: Number,
      },
      eu: {
        f1: Number,
        f2: Number,
      },
      i: {
        f1: Number,
        f2: Number,
      },
      e: {
        f1: Number,
        f2: Number,
      },
    },
    required: true,
  },
});

const Formant = mongoose.model("formant", formantSchema);

module.exports = Formant;
