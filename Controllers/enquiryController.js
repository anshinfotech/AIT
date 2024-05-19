const Enquiry = require("../Models/enquiryModel");
const nodemailer = require("nodemailer");
const exceljs=require("exceljs")

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "anshinfotech1@gmail.com",
    pass: "lcooffigfklnztpl",
  },
});

const submitEnquiry = async (req, res) => {
  const { name, email, phone, college, address, course } = req.body;
  let uniqueID = Math.floor(Math.random() * 900000) + 100000;
  try {
    const enquirydata = new Enquiry({
      name,
      email,
      phone,
      college,
      address,
      uniqueID,
      course,
    });
    const info = await transporter.sendMail({
      from: "anshinfotech1@gmail.com", // sender address
      to: email, // recipient
      subject: "Thank you for your enquiry", // Subject line
      text: `We have received your enquiry. We will get back to you soon Please note down the below given id for future purposes.  Refernce No.:- ${uniqueID}`, // Plain text body
      // You can also include HTML content
      html: `We have received your enquiry. We will get back to you soon Please note down the below given id for future purposes. Refernce No.:- ${uniqueID}`,
    });
    const savedEnquiry = await enquirydata.save();
    console.log(info);
    res.status(200).json({ success: true, savedEnquiry });
    console.log(savedEnquiry);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const allEnquiries = async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
    console.log(data);
  } catch (error) {
    res.send(error);
  }
};

const downloadExcel = async (req, res) => {
  try {
    let workbook= new exceljs.Workbook()
    const sheet = workbook.addWorksheet("Contact Enquiries")
    const enquirydata = await Enquiry.find().sort({ name: "ascending" });
    sheet.columns=[
      {header:"Name",key:"name",width:35},
      {header:"Phone",key:"phone",width:35},
      {header:"College",key:"college",width:50},
      {header:"Course",key:"course",width:35},
    ]
    enquirydata.map(enquiry=>{
      sheet.addRow({
        name:enquiry.name,
        phone:enquiry.phone,
        college:enquiry.college,
        course:enquiry.course,
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
      "attachment; filename=enquiries.xlsx"
    );
    await workbook.xlsx.write(res)
    res.end()
  } catch (error) {
    res.send(error)
  }
};

module.exports = { allEnquiries, submitEnquiry,downloadExcel };
