import mongoose from 'mongoose';



const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    serviceDescription: 
    { 
        type: String,
        required: true 
    }
  });


const Service = mongoose.model('Service', serviceSchema)

export default Service;