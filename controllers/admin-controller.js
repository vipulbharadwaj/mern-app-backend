const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No User Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contact Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const deleteContactById = async(req, res, next)=>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message: "Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
};


/* Updating User By ID */
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

/* Updating User By ID */
const updateUserById =async(req, res, next)=>{
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({_id: id}, {
            $set: updatedUserData,
        });

        return res.status(200).json(updatedData);

    } catch (error) {
     next(error);   
    }

};

/* Deleteing User By ID */
const deleteUserById = async(req, res, next)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id : id});

        return res.status(200).json({message: "User Deleted Successfully"});

    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, getContacts, deleteUserById, getUserById, updateUserById, deleteContactById };
