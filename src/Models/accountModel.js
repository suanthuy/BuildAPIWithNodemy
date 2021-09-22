const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Blog_Test", {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountSchema = new Schema(
    {
        id: { type: ObjectId },
        username: { type: String },
        password: { type: String },
    },
    {
        collection: "account",
    }
);

const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
