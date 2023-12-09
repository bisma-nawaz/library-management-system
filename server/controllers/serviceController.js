import Service from '../models/Service.js';

// add new service
export const addService = async (req, res) => {
    const { serviceName, serviceDescription } = req.body;

    try {
        // create new service: 
        const newService = new Service({
            serviceName,
            serviceDescription
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get all the services: 
export const getServices = async (req, res) => {
    try {
        // fidn the services; 
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
