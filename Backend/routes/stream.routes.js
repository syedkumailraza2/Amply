import express from "express";
import { createStream, getStream } from "../controller/stream.controller.js";

const streamRouter = express.Router()

streamRouter.post('/create',createStream)
streamRouter.get('/:id',getStream)

export default streamRouter