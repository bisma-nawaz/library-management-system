import Manager from '../models/Manager.js'; 

// export const deleteManager = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await Manager.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Manager deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// export const addManager = async (req, res) => {
//     const { managerRollNumber } = req.body;
//     try {
//         const user = await User.findOne({ rollNumber: managerRollNumber, role: 'manager' });
//         if (!user) {
//             return res.status(404).json({ message: "Manager user not found" });
//         }
        
//         const newManager = new Manager({
//             managerRollNumber: managerRollNumber,
//             user: user._id,  // This should be the ObjectId
//         });

//         await newManager.save();
//         res.status(201).json(newManager);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// get list of all managers:
export const getManager = async (req, res) => {
    try {
      const manager = await Manager.find();
      res.status(200).json(manager);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

