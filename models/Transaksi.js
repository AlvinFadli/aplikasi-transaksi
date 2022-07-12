const { model, Schema } = require("mongoose");
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const d = new Date();
const hariIni = `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
const waktuHariIni = new Date().toLocaleTimeString();
const newTransactionSchema = new Schema({
  tanggal: {
    type: String,
    default: hariIni,
  },
  waktu: {
    type: String,
    default: waktuHariIni,
  },
  total: {
    type: Number,
  },
});

module.exports = model("Transaksi", newTransactionSchema);
