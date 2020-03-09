const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const requestIp = require("request-ip");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://syedebad:ebad123@cluster0-xt32z.mongodb.net/My_Users?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

const User = require("./user");

app.use("/", (req, res) => {
  var clientIp = requestIp.getClientIp(req);
  User.findOne({ ip: clientIp }).then(user => {
    if (user) {
      User.findOneAndUpdate({ ip: clientIp }, { $inc: { counts: 1 } })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      const newUser = User({
        ip: clientIp,
        counts: 1
      });

      newUser
        .save()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
