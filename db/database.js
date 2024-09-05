const mongoose = require('mongoose');
const url = "mongodb+srv://sk4118251:souravMongoKumar@cluster0.oukkq7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().catch(err => console.log(err));
async function main() {
   const res =  await mongoose.connect(url);
   console.log(res);
   console.log("successful");
}
