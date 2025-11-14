const enquiryModel=require('../../models/enquiry.model');

let enquiryInsert=(req, res)=>{
   let {name, email, phone, message}=req.body;
   let enquiry=new enquiryModel({
       name:name,
       email:email,
       phone:phone,
       message:message
   });
   enquiry.save().then(()=>{
       res.send({status:1, message:"Enquiry inserted successfully"});
   }).catch((err)=>{
       res.send({status:0, message:"Enquiry insertion failed", error:err    });
   });
}
let enquiryList=async (req,res)=>{
  let enquiry=await enquiryModel.find();
    res.send({status:1, enquiryList:enquiry});
}
let enquiryDelete=async (req,res)=>{
  let enId=req.params.id;
   let enquiry=await enquiryModel.deleteOne({_id: enId});
   res.send({status:1, message:"Enquiry deleted successfully",enquiry});
}
let enquirySingleRow=async (req,res)=>{
  let enId=req.params.id;
  let  enquiry=await enquiryModel.findOne({_id: enId});
   res.send({status:1, enquiryData:enquiry});
}

let enquiryUpdate=async (req,res)=>{
  let enId=req.params.id;
  let {name, email, phone, message}=req.body;
   let updateObj={
       name:name,
       email:email,
       phone:phone,
       message:message
   };
   let enquiry=await enquiryModel.updateOne({_id: enId}, updateObj);
   res.send({status:1, message:"Enquiry updated successfully", enquiry});
}
 
module.exports={enquiryInsert, enquiryList,enquiryDelete,enquirySingleRow,enquiryUpdate};