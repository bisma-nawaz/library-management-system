import Staff from '../models/Staff.js'; 

export const addStaff = async (req, res) => {
    const { staffRollNumber, booksIssued, staffSalary, manager, userId } = req.body;

    try {
        const newStaff = new Staff({ staffRollNumber, booksIssued, staffSalary, manager, userId });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteStaff = async (req, res) => {
    const { staffRollNumber } = req.params;

    try {
        await Staff.findOneAndDelete({ staffRollNumber });
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getStaff = async (req, res) => {
    try {
      const staff = await Staff.find();
      res.status(200).json(staff);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
// staff performance by sorted books issued: 
  export const getStaffPerformance = async (req, res) => {
    try {
        const staffPerformance = await Staff.find().sort({ booksIssued: -1 }); 
        res.status(200).json(staffPerformance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

