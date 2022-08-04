const { exec } = require("child_process");
const { response } = require("express");
const express = require("express");
const moment = require("moment");
const router = express.Router();
const expenseModel = require("../model/expense");

router.get("/expenses/sortByDate", function (req, res) {
  expenseModel
    .find({})
    .sort({ date: -1 })
    .exec(function (error, expense) {
      res.send(expense);
    });
});
router.post("/expenses", function (req, res) {
  let newItem = new expenseModel({
    item: req.body.item,
    amount: req.body.amount,
    group: req.body.group,
    date: req.body.date
      ? moment(req.body.date).format("LLLL")
      : moment().format("LLLL"),
  });
  newItem.save();
  res.send(newItem);
});
router.put("/update", function (req, res) {
  expenseModel
    .findOneAndUpdate(
      { group: req.body.group1 },
      { group: req.body.group2 },
      { new: true }
    )
    .exec(function (error, response) {
      res.send(response);
    });
});
router.get("/expenses/:groub", function (req, res) {
  expenseModel.find({ group: req.params.groub }).exec(function (error, result) {
    if (req.query.item == "true") {
      let totalAmount = 0;
      result.forEach((a) => (totalAmount += a.amount));
      res.send("total Amount is " + totalAmount);
    } else {
      res.send(result);
    }
  });
});
router.get("/expenses", function (req, res) {
  if (req.params.d1 && req.params.d2) {
    expenseModel
      .find({})
      .and([
        { date: { $gt: moment(d1).format(LLLL) } },
        { date: { $lt: moment(d2).format(LLLL) } },
      ])
      .exec(function (err, result) {
        res.send(result);
      });
  } else if (req.params.d1 || req.params.d2) {
    if (req.params.d1) {
      let d = d1;
    } else {
      let d = d2;
    }
    expenseModel
      .find({ date: { $gt: moment(d).format(LLLL) } })
      .exec(function (err, result) {
        res.send(result);
      });
  } else {
    expenseModel.find({}).exec(function (err, result) {
      res.send(result);
    });
  }
});
module.exports = router;
