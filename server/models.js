import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already exists."]
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists."]
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const transactionSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export const User = new mongoose.model("sparks_user", userSchema);
export const Transaction = new mongoose.model("sparks_transaction", transactionSchema);