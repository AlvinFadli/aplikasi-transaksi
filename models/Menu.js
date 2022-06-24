const { model, Schema } = require("mongoose");

const newMenuSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = model("Menu", newMenuSchema);
