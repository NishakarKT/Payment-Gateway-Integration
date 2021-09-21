import express from "express";
import mongoose from "mongoose";
import http from "http";
import { User, Transaction } from "./models.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "aJsonWebTokenSecretKeyMustBeAteast32CharactersLongAndIguessImustHaveReachedTheMinLimit";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// requests
app.post("/auth", async (req, res) => {
    const { myUsername, myPassword } = req.body;

    try {
        const token = await jwt.sign({ username: myUsername }, SECRET_KEY);

        User.find({ username: myUsername }, async (err, data) => {
            if (err)
                res.status(500).send(err);
            else {
                if (data.length === 0)
                    res.send("Username doesn't exist! Try a different one.")
                else {
                    const hashedPass = data[0].password;
                    const match = await bcrypt.compare(myPassword, hashedPass);
                    if (match)
                        res.status(200).send({ auth: true, token });
                    else
                        res.status(200).send({ auth: false, err: "Password doesn't match! Try a different one." });
                }
            }
        });
    } catch (err) { res.send(err) };

});


app.post("/token", async (req, res) => {
    const { token } = req.body;

    try {
        const { username } = await jwt.verify(token, SECRET_KEY);

        User.find({ username }, (err, data) => {
            if (err)
                res.status(500).send(err);
            else {
                if (data.length === 0)
                    res.send("User does not exist")
                else {
                    res.status(200).send(data[0]);
                }
            }
        });

    } catch (err) { res.send(err) };

});

app.post("/new", async (req, res) => {
    const { username, fullName, email, password, balance } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const token = await jwt.sign({ username }, SECRET_KEY);
        const user = new User({ username, fullName, email, password: hashedPass, balance });
        user.save().then(() => {
            res.status(200).send(token);
        }).catch(err => res.status(400).send(err))
    } catch (err) { res.send(err) };

});

app.get("/customers/:username", async (req, res) => {
    const { username } = req.params;
    try {
        User.find().then(users => {
            const otherUsers = users.filter(user => user.username !== username);
            res.status(200).send(otherUsers);
        }).catch(err => res.status(400).send(err))
    } catch (err) { res.send(err) };
});

app.get("/getTransactions", async (req, res) => {
    try {
        Transaction.find().then(transactions => {
            res.status(200).send(transactions);
        }).catch(err => res.status(400).send(err))
    } catch (err) { res.send(err) };
});

app.patch("/transactions", async (req, res) => {
    const { myUsername, username, myBalance, userBalance } = req.body;

    try {
        User.updateOne({ username: myUsername }, { balance: myBalance }).then(res => {
            res.status(200).send("Updated");
        }).catch(err => res.send(err));
        User.updateOne({ username }, { balance: userBalance }).then(res => {
            res.status(200).send("Updated");
        }).catch(err => res.send(err));
    } catch (err) { res.send(err) };
});

app.post("/setTransactions", async (req, res) => {
    const data = req.body;

    try {
        const transaction = new Transaction(data);
        transaction.save().then(res => {
            res.status(200).send("Updated");
        }).catch(err => res.send(err));
    } catch (err) { res.send(err) };
});

// connecting to mongo db
mongoose.connect("mongodb+srv://admin:UXW3ZPW4nIBhHlpx@cluster0.xxutl.mongodb.net/sparks?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}).then(() => {
    console.log("connection: success");
}).catch(err => console.log(err));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("Listening to PORT: " + PORT));