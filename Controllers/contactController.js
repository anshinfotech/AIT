const Contact = require("../Models/contactSchema");

const contactQuerySubmit = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contactdata = new Contact({
      name,
      email,
      subject,
      message,
      uniqueID: Math.floor(Math.random() * 900000) + 100000,
    });
    const savedEnquiry = await contactdata.save();
    res.status(200).json({ success: true, savedEnquiry });
    console.log(savedEnquiry);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const allqueries = async (req, res) => {
  try {
    const contactdata = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contactdata });
    console.log(contactdata);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { allqueries, contactQuerySubmit };
