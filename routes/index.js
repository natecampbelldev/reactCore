// desktop
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Player from "../models/userModel.js";

const app = express();
const DB = "mongodb://127.0.0.1/ReactorCore";
const PORT = 3535;

app.use(cors());
app.use(express.json());

// everything from the RootLayout
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { intent, ...rest } = req.body;
  console.log(rest);
  switch (intent) {

    // Login
    case "login":
      const user = await Player.findOne(rest);
      if (!user) {
        return res.status(404).json({
          errors: { login: { message: "User Not Found", path: "login" } },
        });
      }
      return res.status(202).send(user);

      // Registration
    case "signUp":
      try {
        if (rest.password !== rest.passwordConfirm) {
          return res.status(412).json({
            errors: {
              passwordConfirm: {
                message: "Passwords Do Not Match",
                path: "passwordConfirm",
              },
            },
          });
        }
        delete rest.passwordConfirm;
        const makePlayer = await Player.create(rest);
        return res.status(201).send(makePlayer);
      } catch (er) {
        console.log(er);
        if (er.errorResponse) {
          return res.status(509).json({
            errors: {
              [Object.keys(er.keyValue)[0]]: {
                message: er.errorResponse.errmsg,
                path: Object.keys(er.keyValue)[0]
              },
            },
          });
        }
        return res.status(510).json(er);
      }

      // Start New Game
    case "newGame":
      try {
        const upDatedUser = await Player.findByIdAndUpdate(rest.userId, {
          $push: {
            games: { $each: [{ name: rest.reName, locale: rest.reLocale }] },
          },
        });
        console.log(upDatedUser);
        return res.status(201).send(upDatedUser);
      } catch (er) {
        console.log(er);
        if (er.errorResponse) {
          return res.status(509).json({
            errors: {
              [Object.keys(er.keyValue)[0]]: {
                message: er.errorResponse.errmsg,
                path: Object.keys(er.keyValue)[0]
              },
            },
          });
        }
        return res.status(510).json(er);
      }

    default:
      return res
        .status(512)
        .json({ errors: { form: { message: "No Form Intent" } } });
  }
});

app.put("/:id", async (req, res) => {
  const { reactor } = req.body;
  try {
    const { id } = req.params;
    const user = await Player.findById(id);
    if (!user) return res.status(404).json({ message: "Player Not Found" });
    const found = user.games.map((core) => {
      if (core.name === reactor.name) core = reactor;
    });
    if (!found) return res.status(404).json({ message: "Reactor Not Found" });
    await user.save();
    return res.status(201).send(found);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

mongoose.connect(DB).then(() => {
  console.log(`Connected to ${DB}`);
  app.listen(PORT, () => {
    console.log(`Local server is at http://localhost:${PORT}`);
  });
});
