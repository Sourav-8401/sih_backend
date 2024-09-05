import { Schema } from "mongoose";

const adminSchema  = new Schema({
    worker_name : String,
    mob_no : Number,
    location : String,
    alloted_area : String, 
    adhaar_no : String,
    
    worker_under : {
        
    },
    gov_body : String,
})


