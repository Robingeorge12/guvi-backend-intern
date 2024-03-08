import { signedUp_Data, login_Data, logout, patch_user_data } from "../controller/signup.controller.js";

import express from "express"

export const signupRouter = express.Router()

signupRouter.post("/", signedUp_Data);
signupRouter.patch("/:id", patch_user_data);
signupRouter.post("/login", login_Data);
signupRouter.get("/logout", logout);
