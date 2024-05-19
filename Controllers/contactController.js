const Contact = require("../Models/contactSchema");
const exceljs = require("exceljs");

const contactQuerySubmit = async (req, res) => {
  const { name, email, subject, message,mobile } = req.body;

  try {
    const contactdata = new Contact({
      name,
      email,
      subject,
      message,
      mobile,
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
