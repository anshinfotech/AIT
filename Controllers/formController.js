const FormSubmission = require("../Models/formSubmission");

const coursesubmit = async (req, res) => {
    try {
      const { name, email, phoneNumber, university, city } = req.body;
  
      // Create new form submission
      const submission = new FormSubmission({
        name,
        email,
        phoneNumber,
        university,
        city,
      });
      console.log(submission);
  
      // Save to database
      await submission.save();
  
      res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

const getCourses = async(req,res)=>{
    try{
       const submissions=await FormSubmission.find()
       .sort('-createdAt');
       if(!submissions){throw new Error()}
       res.status(200).json(submissions)
    }catch(err){
        console.log(err)
        res.status(404).send("No Data Available")
    }
}

module.exports={coursesubmit,getCourses};