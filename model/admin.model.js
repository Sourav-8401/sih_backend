import { Schema } from "mongoose";

const adminSchema  = new Schema({
    admin_name : String,
    worker_under : {
        
    },
    gov_body : String,
})
