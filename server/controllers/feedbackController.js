import Feedback from '../models/Feedback.js';
import Service from '../models/Service.js';

export const submitFeedback = async (req, res) => {
    const { content, rating, studentrollNumber, serviceName } = req.body;

    // service eexits or not with the given name? 
    const serviceExists = await Service.findOne({ serviceName });
    if (!serviceExists) {
        return res.status(404).json({ message: 'Service not found' });
    }

    try {
        const feedback = new Feedback({ content, rating, studentrollNumber, serviceName });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find();
        res.status(200).json(feedbackList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeedbackByService = async (req, res) => {
    const { serviceName } = req.params;
    try {
        const feedbackList = await Feedback.find({ serviceName }).populate('serviceName', 'serviceDescription');
        res.status(200).json(feedbackList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getFeedbackForManager = async (req, res) => {
    try {
        const feedbackForManager = await Feedback.find().select('content rating -_id - serviceName');
        res.status(200).json(feedbackForManager);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
