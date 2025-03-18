import express from "express";
import { createUpvote, deleteUpvote } from "../controller/upvote.controller.js";


const upvoteRouter = express.Router()

upvoteRouter.post('/create',createUpvote)
upvoteRouter.delete('/:id',deleteUpvote)

export default upvoteRouter