
import express from 'express';
import mongoose from 'mongoose';
import { ClientEncryption, MongoClient } from 'mongodb'
import user from './Model/user.js';

const connection_str = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(connection_str);
const database = "MERN";

mongoose.connect("mongodb://127.0.0.1:27017/MERN")
  .then(() => console.log("Db Connected"))
  .catch(err => console.log("err"))

export const getData = async (req, res) => {
  console.log(req.params.city)
  let response = await client.connect();
  let db = response.db(database);
  let collection = db.collection('users');
  const users = await collection.find({ "city": req.params.city }).toArray()
  console.log(users)


  res.send(users);
}

export const getSearchData = async (req, res) => {
  console.log(req.params.city)
  let response = await client.connect();
  let db = response.db(database);
  let collection = db.collection('users');
  const users = await collection.find().toArray()
  // console.log(users)
  let i = []
  users.map((u, index) => {
    console.log(u.email, index)
    // i = [...i, index]
    i = 1
  })
  // console.log(users.email)
  console.log(users[i].email)
  if (req.query.search) {

    const filterData = await users.filter(filter => user.name.includes(req.query.search))
    console.log(filterData)
    res.send(filterData)
    return;
  }
}

export const insertData = async (req, res) => {
  const userdata = req.body;
  const savedData = new user({
    name: userdata.name,
    email: userdata.email,
    contact: userdata.contact,
    city: userdata.city,
    age: userdata.age

  })
  savedData.save()
  console.log(savedData)
  res.send(userdata)
}

export const updateData = async (req, res) => {
  const { email, name, contact, city, age } = req.body;
  const updateparam = req.params.email;

  await user.findOneAndUpdate({ "email": updateparam }, { "name": name, "contact": contact, "city": city, "age": age }).then((result) => {
    console.log(result)
    res.send(`Update user with ID: ${updateparam}, Data: ${JSON.stringify(result)}`)
  })

}

export const deleteData = async (req, res) => {

  console.log(req.params.email)
  await user.findOneAndDelete({ "email": req.params.email }).then((result) => {
    console.log(result);
    res.send(`user deleted successfully with email: ${req.params.email}`)
  })


}



