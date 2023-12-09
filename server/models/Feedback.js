import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import User from './User.js';

const feedbackSchema = new mongoose.Schema({
    content: { 
        type: String,
        required: true 
    },
    rating: { 
        type: Number, 
        required: true,
    },
    studentrollNumber: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
        ref: 'Service' 
    }
});

feedbackSchema.pre('save', async function (next) {
    const studentExists = await User.findOne({ rollNumber: this.studentrollNumber });
    if (!studentExists) {
        next(new Error('Invalid student roll number'));
    } else {
        next();
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
