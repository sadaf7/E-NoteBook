const mongoose = require ('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User4"
  },
  title:{
    type: String,
    
  },
  description:{
    type: String,
    
    
  },
  title:{
    type: String,
    
    
  },
  date:{
    type: Date,
    default: Date.now
  }
  }
);
const notes = mongoose.model("Note4",noteSchema);

 module.exports=notes ;