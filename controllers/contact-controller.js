const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;

        await Contact.create(response);
        return res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        console.error("Error occurred while processing contact form:", error);
        return res.status(500).json({ msg: "Some error occurred" });
    }
};

module.exports = contactForm;

