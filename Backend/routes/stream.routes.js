import express from "express";
import { createStream } from "../controller/stream.controller.js";

const streamRouter = express.Router()

streamRouter.post('/create',createStream)

export default streamRouter