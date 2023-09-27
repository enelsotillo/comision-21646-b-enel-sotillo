import express from "express";
import { taskRouter } from "./src/routes/task.routes.js";
import { startDb } from "./src/config/database.js";
import cors from "cors";
const app = express();
const port = 3000;
//middware
app.use(express.json());
app.use(cors());

app.use('/', taskRouter)

app.get('/', (req, res) =>{
 console.log("todo listo");
 res.send("todo listo");
})

app.listen(port, () =>{
    console.log(`server express http://localhost:${port}`)
    startDb();
})
