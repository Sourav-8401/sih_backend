import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import { Task } from "../model/task.model.js";
const connectDB = async ()=>{
   try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("MONGODB CONNECTION SUCCESSFUL: DB_HOST ",connectionInstance.connection.host);

      // TEST ***********************************************************************************************/
      // await Task.insertMany([{
      //    buildingId: 'samp0',
      //    taskTitle : 'title0',
      //    location : {latitude: '12.123.12.3', longitude: '0.0.0.0'},
      //    startDate: '2002-12-09',
      //    endDate: '2012-12-01',
      //    percentage: 90
      // }])
      // const data = await Task.findOne();
      // const data = await mongoose.connection.db.collection("admins").find({}).toArray();
      // console.log(data);
      //*************************************************************************************************** */
   } catch (error) {
      console.log("MONGODB CONNECTION ERROR :", error);
      process.exit(1);
   }
}

export default connectDB