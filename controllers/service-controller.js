const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        res.status(200).json({ services: response }); 
    } catch (error) {
        console.error(`Error fetching services: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
};

module.exports = services;
