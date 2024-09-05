// import mongoose from "mongoose";
// import { DB_NAME } from "./constants"; //DB_NAME = "test"
// import express from "express";

const mongoose = require("mongoose");
const express = require("express");

const app = express();
;(async ()=>{
    try {
       await mongoose.connect("mongodb+srv://nirmaan:gREIw99FDSJYFr1B@cluster0.oukkq7r.mongodb.net/test");

       app.on("error", (error)=>{
        console.log("ERROR:", error);
        throw error
       })

    // console log the data present in the users document of test collection
       
       const admins = await mongoose.connection.db.collection('souravs').find({}).toArray();
       console.log(admins);

       app.listen(process.env.PORT, ()=>{
        console.log("APP IS LISTENING ON PORT: ", process.env.PORT);
       } )
    } catch (error) {
        console.error("ERROR", error);
        throw error
    }
})()