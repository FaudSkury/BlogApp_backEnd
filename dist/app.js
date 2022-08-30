"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const BlogPost_routes_1 = __importDefault(require("./routes/BlogPost-routes"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use(express_1.default.json());
app.use("/blogPost", BlogPost_routes_1.default);
const errorHandler = (err, req, res, next) => {
    res.status(500).send(err.message);
    console.error(err);
};
app.use(errorHandler);
async function connectToMongoDB() {
    try {
        await mongoose_1.default.connect("");
        console.log("Connected");
    }
    catch (error) {
        console.log(error);
    }
}
const Port = 4000;
app.listen(Port, () => {
    console.log(`Listening at port ${Port}`);
    connectToMongoDB();
});
