// Import necessary dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Task schema
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        required: true,
        default: 'pending'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports =  Task ;

