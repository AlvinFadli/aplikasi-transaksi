const { model, Schema } = require("mongoose");
const newTransactionSchema = new Schema({
  kode: {
    type: String,
    required: true,
  },
  tanggal: {
    type: String,
    default: Date(),
  },
  total: {
    type: Number,
  },
});

module.exports = model("Transaksi", newTransactionSchema);
