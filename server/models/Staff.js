import mongoose from 'mongoose';
import User from './User.js'; 
import Manager from './Manager.js';

const staffSchema = new mongoose.Schema({
    staffRollNumber: { 
        type: String,
        required: true,
        unique: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    booksIssued: {
        type: Number,
        required: true
    },
    staffSalary: {
        type: Number,
        required: true
    },
    manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Manager'
    }
});


staffSchema.pre('validate', async function (next) {
    try {
        // uer exists with given roll number? 
        const user = await User.findOne({ rollNumber: this.staffRollNumber, role: 'staff' });
        if (!user) {
            throw new Error('Invalid roll number: No staff found with this roll number');
        }
        // if staff exists, associates uer's id wuth that of staff 
        this.user = user._id;

        // mansger exisits? 
        const manager = await Manager.findById(this.manager);
        if (!manager) {
            throw new Error('Invalid manager ID: Manager does not exist');
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
