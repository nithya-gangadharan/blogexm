require('dotenv').config()
const cors=require('cors')
const express=require('express')
require('./config/db')
const router=require('./routes/routes')
const server=express()
// enable cors in server
server.use(cors())

server.use(express.json())
server.use(router)
// set up port no
const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log("server running and waiting for client request");
    
})

// errors
server.use((err,req,res,next)=>{
res.status(500).json(err.message)
})

server.get('/',(req,res)=>{
    res.status(200).send(`<h1>server running and wating for client reqq</h1>`)
})
