import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import user_router from './router/user_router';
import products_router from './router/produtos_router';


const server = express();



server.get("/", (req, res)=> {
    res.send("Servidor ligado")
})

server.use(bodyParser.json())
server.use(cors())
server.use("/uploads", express.static("data/uploads"))

server.use("/usuarios", user_router)
server.use("/produtos", products_router)

server.listen(5000,()=> {
    console.log("server listening at port 5000")
})