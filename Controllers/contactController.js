const Contact = require("../Models/contactSchema");
const exceljs = require("exceljs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "anshinfotech1@gmail.com",
    pass: "lcooffigfklnztpl",
  },
});

const contactQuerySubmit = async (req, res) => {
  const { name, email, subject, message,mobile } = req.body;
  let uniqueID= Math.floor(Math.random() * 900000) + 100000
  try {
    const contactdata = new Contact({
      name,
      email,
      subject,
      message,
      mobile,
      uniqueID
    });
    const savedEnquiry = await contactdata.save();
    await transporter.sendMail({
      from: "anshinfotech1@gmail.com", // sender address
      to: email, // recipient
      subject: "Thank you for your enquiry", // Subject line
      text: `We have received your enquiry. We will get back to you soon Please note down the below given id for future purposes.  Refernce No.:- ${uniqueID}`, // Plain text body
      // You can also include HTML content
      html: `We have received your enquiry. We will get back to you soon Please note down the below given id for future purposes. Refernce No.:- ${uniqueID}`,
    });
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

const downloadExcel = async (req, res) => {
  try {
    let workbook= new exceljs.Workbook()
    const sheet = workbook.addWorksheet("Contact Enquiries")
    const contactdata = await Contact.find().sort({ name: "ascending" });
    sheet.columns=[
      {header:"Name",key:"name",width:25},
      {header:"Mobile",key:"mobile",width:25},
    ]
    contactdata.map(contact=>{
      sheet.addRow({
        name:contact.name,
        mobile:contact.mobile
      })
    })
    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=contact_enquiries.xlsx"
    );
    await workbook.xlsx.write(res)
    res.end()
  } catch (error) {
    res.send(error)
  }
};

module.exports = { allqueries, contactQuerySubmit ,downloadExcel};
