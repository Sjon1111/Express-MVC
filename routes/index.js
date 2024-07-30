import express from 'express'

import { getData, insertData, updateData, deleteData, getSearchData } from './controler.js'

import { errorMiddleware } from './Error/errorHandeler.js';
import cors from 'cors'

const app = express();
const port = 8000;
app.use(express.json());

// Dynamic Routes useing regex validation

// Application Midddleware to storr

app.use((req, res, next) => {

  console.log(req.method, req.ip, req.hostname, Date())
  next();
})


// Routs middleware
const auth = (req, res, next) => {
  console.log(req.params.city)
  if (req.params.city == "Ahmedabad") {
    next()

  }
  else {
    res.sendStatus(401)
    console.log("unauthorised")
  }

}
app.get("/user/:name/:id([0-6]{4})", (req, res) => {
  console.log(req.params.id + req.params.name)
  res.send("Get method is working" + " " + req.params.name)

});

app.get("/getData", getSearchData)

app.get("/get/:city", auth, getData)

app.post("/insert", insertData)

app.put("/update/:email", updateData)

app.delete("/delete/:email", deleteData)

// app.use(errorMiddleware)

app.get("*", (req, res) => {
  res.send("Sorry request in not valid")
})
app.listen(port, () => {
  console.log("server is running on port", port)
})