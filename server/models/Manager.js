import mongoose from 'mongoose';
import User from './User.js'; 

const managerSchema = new mongoose.Schema({
    managerRollNumber: { 
        type: String,
        required: true,
        unique: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

managerSchema.pre('validate', async function (next) {
    try {
        // checking whether the user exists with the given roll number
        const user = await User.findOne({ rollNumber: this.managerRollNumber, role: 'manager' });
        if (!user) {
            throw new Error('Invalid roll number: No manager found with this roll number');
        }
        // if manager exists, associate the user's id with  manager
        this.user = user._id;
            } catch (error) {
        next(error);
    }
});

const Manager = mongoose.model('Manager', managerSchema);
export default Manager;