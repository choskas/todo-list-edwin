const { Schema, model } = require('mongoose')

const todoSchema = new Schema(
  {
    tags: {
        type: Array,
        required: true
      },
      title: {
          type: String,
          required: true
      },
      description: {
          type: String,
          required: true
      },
  },
 
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Todo', todoSchema)