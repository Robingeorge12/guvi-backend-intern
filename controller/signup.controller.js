import { SignUpModel } from "../model/signup.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const patch_user_data = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const payload = req.body;
    console.log(payload);

    let userData = await SignUpModel.updateOne({_id:id}, payload);
    // await userData.save();
    res.status(200).send({ message: `User Data Has Been Updated` });
  } catch (er) {
      console.log(er)
    return res.status(500).send({ message: "Server Side  Error" });
  }
};



export const signedUp_Data = async (req, res) => {
  try {
    let { email, password, username } = req.body;
    console.log("da",email, password, username);
    let isSignedUp = await SignUpModel.findOne({ email: email });
    // console.log("sig",isSignedUp);

    if (isSignedUp) {
      return res.status(422).send({
        message: `${isSignedUp.username} is already Exist, Please login`,
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    let payload = {
      username,
      email,
      password: hashedPassword,
    };
    // console.log("pa",payload)

    try {
      let saveSignup_data = await SignUpModel.create(payload);
      await saveSignup_data.save();

      res.status(201).send({ message: "User signedup successfully" });
    } catch (er) {
      res.status(422).send({ message: "User signedup failed",er });
    }
  } catch (er) {
    // console.log(er);
    return res.status(500).send({ message: "Server Side SignedUp Error" });
  }
};

export const login_Data = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    let isUserExist = await SignUpModel.findOne({ email: email });
    console.log(isUserExist);
    if (!isUserExist) {
      return res.status(422).send({
        message: `This Email and Password are Incorrect, If not SignedUp Please SignUp`,
      });
    }

    try {
      let isCheckPassword = await bcrypt.compare(
        password,
        isUserExist.password
      );
      // console.log(process.env.SECRET_KEY);
      if (isCheckPassword) {
        const token = await jwt.sign(
          { userId: isUserExist._id, email: isUserExist.email },
          process.env.SECRET_KEY,
          { expiresIn: "3d" }
        );

        res.cookie("accessToken", token, {
          expire: new Date() + 86400000,
        });

        let isSendUser = await SignUpModel.findOne(
          { email: email },
          "-password"
        );
        console.log("sed", isSendUser);
        // let userAll_data = await UserModel.findOne({ user_id: isSendUser._id });
        // console.log("perso", userAll_data);

        // if (userAll_data) {
        //   return res.status(200).send({
        //     message: "User LogedIn Successfully",
        //     token: token,
        //     isSendUser: isSendUser,
        //     userAll_data: userAll_data,
        //   });
        // } else {
        //   return res.status(200).send({
        //     message: "User LogedIn Successfully",
        //     token: token,
        //     isSendUser: isSendUser,
        //     userAll_data: [],
        //   }); 
        // }

return res.status(200).send({
  message: "User LogedIn Successfully",
  token: token,
  isSendUser: isSendUser,
  // userAll_data: [],
}); 
      }
      res.status(400).send({ message: "Email and Password are Wrong" });
    } catch (er) {
      //   console.log("er",er);
      return res
        .status(400)
        .send({ message: "Your Login Request Has Been Declined" });
    }
  } catch (er) {
    //   console.log(er);
    return res.status(500).send({ message: "Server Side SignedUp Error" });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User Log out successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Server Side Error",
    });
  }
};


