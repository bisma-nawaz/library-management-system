import mongoose from 'mongoose';
//import User from './User';
//import Student from './Student';
//import Staff from './Staff';
import { v4 as uuidv4 } from 'uuid';

const checkoutSchema = new mongoose.Schema({
    checkoutID: 
    { 
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4() 
    },
    checkoutDate:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate:
    {
       type: Date
    },
    dueDate:
    {
        type: Date,
        required: true
    },
    studentID:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    staffID:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Staff'
    },
    bookISBN:
    {
        type: String,
        required: true,
    }
  });

  checkoutSchema.virtual('bookInfo', {
    ref: 'Book',
    localField: 'bookISBN',
    foreignField: 'ISBN',
    justOne: true 
});



const Checkout = mongoose.model('Checkout', checkoutSchema)

export default Checkout;