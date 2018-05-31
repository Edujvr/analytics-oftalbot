const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  result:{
    resolvedQuery:{
      type: String,
      required:true,
    },
    metadata:{
      intentName:{
        type: String,
        required:true
        }
      },
    fulfillment:{
      speech:{
        type: String,
        required:true
        }
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tasks", TaskSchema);
