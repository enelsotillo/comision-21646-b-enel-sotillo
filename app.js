import express from "express";
import { taskRouter } from "./src/routes/task.routes.js";
import { startDb } from "./src/config/database.js";
import cors from "cors";
import path from 'node:path';
import { fileURLToPath } from "node:url";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)
const app = express();

const port = process.env.PORT;

//middware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(express.static(path.join(__dirname, "src", "public")));
 
app.set('views', path.join(__dirname, "src", "views"));
app.set('views engine', 'ejs');


app.use('/', taskRouter)

app.get('/', (req, res) =>{
 console.log("todo listo");
 res.send("todo listo");
})

app.listen(port, () =>{
    console.log(`server express http://localhost:${port}`)
    startDb();
})
