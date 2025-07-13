const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, require},
    description: { type: String, require  },
    priority: { type: String },
    status: { type: String },
    team_id:{ type: mongoose.Schema.Types.ObjectId, 
        ref: "Team",
        },
    created_by: { type: mongoose.Schema.Types.ObjectId, 
      ref: "User"
    },
    audioNote: {
      type:String
    }
  }, {
  timestamps:true,
})

module.exports = mongoose.model("Task", taskSchema);