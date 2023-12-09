// import mongoose from 'mongoose';
// import User from './User';


// const studentSchema = new mongoose.Schema({
//     studentRollNumber: { 
//         type: String,
//         required: true,
//         unique: true
//     },
//     studentName:
//     {
//         type: String,
//         required: true
//     },
//     studentEmail:
//     {
//         type: String,
//         required: true,
//         unique: true
//     },
//     // studentPhone:
//     // {
//     //     type: String,
//     //     required: true,
//     //     unique: true
//     // },
//     studentFine:
//     {
//         type: Number,
//     }
//   });

// // virtual field to link to rollnumver in the userschema: 
// studentSchema.virtual('userInfo', {
//     ref: 'User',
//     localField: 'studentRollNumber',
//     foreignField: 'rollNumber',
//     justOne: true
// });

// studentSchema.pre('save', async function (next) {
//     // make sure that the user exists in the user schema: 
//     const user = await User.findOne({ rollNumber: this.studentRollNumber });
//     if (!user) {
//         next(new Error('Invalid student roll number'));
//     } else {
//         next();
//     }
// });



// const Student = mongoose.model('Student', studentSchema)

// export default Student;



import mongoose from 'mongoose';
import User from './User.js'; // Ensure this is the correct path to your User model

const studentSchema = new mongoose.Schema({
    studentRollNumber: { 
        type: String,
        required: true,
        unique: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    studentFine: {
        type: Number,
        default: 0,
    }
});

// Virtual field to link to roll number in the User schema
studentSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'studentRollNumber',
    foreignField: 'rollNumber',
    justOne: true
});

studentSchema.pre('validate', async function (next) {
    try {
        // check whether user exits with given roll numbre 
        const user = await User.findOne({ rollNumber: this.studentRollNumber, role: 'student' });
        if (!user) {
            throw new Error('Invalid roll number: No student found with this roll number');
        }
        // if student exists, associates user's id with student
        this.user = user.rollNumber;
        next();
    } catch (error) {
        next(error);
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
