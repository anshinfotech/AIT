const Registration = require("../Models/registrationModel");

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      father_Name,
      mother_Name,
      contactNumber,
      alternateContactNumber,
      email,
      collegeName,
      OtherState,
      country,
      trainingMethod,
      branch,
      semester,
      state,
      city,
      course,
      trainingPeriod,
    } = req.body;
    const registration = new Registration({
      name,
      father_Name,
      mother_Name,
      contactNumber,
      alternateContactNumber,
      email,
      collegeName,
      branch,
      semester,
      country,
      state,
      city,
      course,
      trainingPeriod,
      trainingMethod,
      OtherState,
      uniqueID: Math.floor(Math.random() * 900000) + 100000,
    });
    const savedRegistration = await registration.save();
    res.status(200).json(savedRegistration);
    console.log(savedRegistration);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    let registrations = await Registration.find();
    console.log(registrations);
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const deleteStudentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteData = await Registration.findByIdAndDelete(id);
    // await deleteData.save()
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { registerStudent, deleteStudentDetail, getStudentDetails };
