import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import  express  from "express"
import connection from "./db/db.js"
import { signupRouter } from "./route/signup.route.js"
// import { userRouter } from "./route/user.route.js"

const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000


app.use("/sign", signupRouter)
// app.use("/user", userRouter);


app.listen(PORT,async () => {
    try {
     
        await connection;

   console.log(PORT);

    }catch (er) {
        console.log(er)
    }
})
