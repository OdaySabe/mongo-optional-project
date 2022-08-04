const mongoose = require("mongoose");
const data = require("./data");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  item: String,
  amount: Number,
  date: Date,
  group: String,
});
const expenseModel = mongoose.model("expense", expenseSchema);
// data.forEach((a) => {
//   let item = new expenseModel({
//     item: a.item,
//     amount: a.amount,
//     date: a.date,
//     group: a.group,
//   });
//   item.save();
// });
module.exports = expenseModel;
