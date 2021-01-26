const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = express.Router();
const PORT = 4000;

let User = require("./user.model");
let Question = require("./question.model");
let Answer = require("./answer.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/forum", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

projectRoutes.route("/getQuestion/:filter/:filterOut/:search?").get(function (req, res) {
  let filter=req.params.filter;
  let filterOut=req.params.filterOut;
  let search=req.params.search;
  if (filterOut=='none'){
    if (!req.params.search){
      Question.find({},null,{sort:filter},function (err, questions) {
        if (err) {
          console.log(err);
        } else {
          if(filter=="-vote"){
            Question.aggregate(
            [
                { "$project": {
                  "space":1,
                  "title":1,
                  "content":1,
                  "answer":1,
                  "time":1,
                  "creatorid":1,
                  "creatorName":1,
                  "up":1,
                  "length":{"size":"$up"}
                }},
                { "$sort": { "length": -1 } },
            ],
            function(err,questionss){
              if (err) {
                console.log(err);
              } else {
                res.json(questionss);
            }})
          }
          else{
            console.log(filterOut);
            res.json(questions);
          }
        }
      });
    }
    else{
      Question.find({"title": { "$regex": search, "$options": "i" }},null,{sort:filter},function (err, questions) {
        if (err) {
          console.log(err);
        } else {
          if(filter=="-vote"){
            Question.aggregate(
            [
                { "$project": {
                  "space":1,
                  "title":1,
                  "content":1,
                  "answer":1,
                  "time":1,
                  "creatorid":1,
                  "creatorName":1,
                  "up":1,
                  "length":{"size":"$up"}
                }},
                { "$sort": { "length": -1 } },
            ],
            function(err,questionss){
              if (err) {
                console.log(err);
              } else {
                res.json(questionss);
            }})
          }
          else{
            console.log(filterOut);
            res.json(questions);
          }
        }
      });
    }

  }

  else{Question.find({space:filterOut},null,{sort:filter},function (err, questions) {
    if (err) {
      console.log(err);
    } else {
      if(filter=="-vote"){
        Question.aggregate(
        [
            { "$project": {
              "space":1,
              "title":1,
              "content":1,
              "answer":1,
              "time":1,
              "creatorid":1,
              "creatorName":1,
              "up":1,
              "length":{"size":"$up"}
            }},
            { "$sort": { "length": -1 } },
        ],
        function(err,questionss){
          if (err) {
            console.log(err);
          } else {
            res.json(questionss);
        }})
      }
      else{
        res.json(questions);
      }
    }
  });}
});

projectRoutes.route("/getAnswer/:qid").get(function (req, res) {
  let qid = req.params.qid;

  Answer.find({ qid: qid }, (err, answers) => {
    if (err) {
      console.log(err);
    } else {
      res.json(answers);
    }
  });
});

projectRoutes.route("/:email").get(function (req, res) {
  let email = req.params.email;
  User.find({ email: email }, (err, user) => {
    res.json(user);
  });
});

projectRoutes.route("/addUser").post(function (req, res) {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      User.find({ email: user.email }, (err, user) => {
        res.json(user);
      });
    })
    .catch((err) => {
      res.status(400).send("adding new user failed");
    });
});

projectRoutes.route("/addQuestion").post(function (req, res) {
  let question = new Question(req.body);
  question
    .save()
    .then((question) => {
      res.status(200).json({ question: "question added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding question failed");
    });
});

projectRoutes.route("/addAnswer").post(function (req, res) {
  let answer = new Answer(req.body);
  console.log(answer.qid);
  let qid = answer.qid;

  answer
    .save()
    .then((answer) => {
          Question.updateOne(
            { _id: qid },
            { $push: { answer: answer._id } }
          ).exec();
      res.status(200).json({ answer: "answer added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding answer failed");
    });
});

projectRoutes.route("/deleteQuestion/:qid").post(function(req,res){
  let qid=req.params.qid;
  console.log(qid);
  Question.findOne({_id: qid})
  .exec(function(err,question){
    if(err){
      console.log("some error occurs");
    }
    else{
      question.remove()
      console.log("removed")
      res.status(200).json({question:"deleted"});
    }})


})

projectRoutes.route("/deleteAnswer/:qid").post(function(req,res){
  let qid=req.params.qid;
  console.log(qid);
  Answer.findOne({_id: qid})
  .exec(function(err,question){
    if(err){
      console.log("some error occurs");
    }
    else{
      question.remove()
      console.log("removed")
      res.status(200).json({question:"deleted"});
    }})


})

projectRoutes.route("/upvote/:qid/:uid").post(function(req,res){
  let qid = req.params.qid;
  let uid=req.params.uid;
  Question.findOne({_id:qid,up:uid})
  .exec(function(err,question){
    if(err){
      console.log("some error occurs");
    }
    if(!question){
      Question.findByIdAndUpdate(qid,{$push: { up: uid }},function(err,question){
        if (err){
          res.status(400).send("can't add upvote")
        }
        else{
          res.json(question);
        }
      })

    }
    else if (question) {
      console.log("unvote");
      Question.findByIdAndUpdate(qid,{$pull: { up: uid }},function(err,question){
        if (err){
          res.status(400).send("can't add upvote")
        }
        else{
          res.json(question);
        }
      })

    }
  })





});

app.use("/forum", projectRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
