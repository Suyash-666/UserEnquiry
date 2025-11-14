import api from "./api";
import { Button ,Label,Textarea,TextInput} from "flowbite-react";
import{ToastContainer,toast} from "react-toastify";
import EnquiryList from "./EnquiryList.jsx";
import { useState,useEffect } from "react";
function Enquiry() {
    let [enquiryList,setEnquiryList]=useState([]);
     const[formData,setFormData]=useState({
        name:"",
        email:"",
        phone:"",
        message:"",
        
     });

    const getValue = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getAllEnquiry = async () => {
        try {
            const res = await api.get("/api/website/enquiry/view");
            const finalData = res.data;
            if (finalData.status) {
                setEnquiryList(finalData.enquiryList);
            }
        } catch (err) {
            console.log(err);
        }
    };

    let saveEnquiry=(e)=>{
            e.preventDefault();
            if(formData._id){
                // Update existing enquiry
                api.put(`/api/website/enquiry/update/${formData._id}`, formData)
                    .then(() => {
                        toast.success("Enquiry updated successfully!"); 
                        setFormData({
                            name:"",
                            email:"",   
                            phone:"",
                            message:"",
                            _id:""
                        });
                        getAllEnquiry();
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("Failed to update enquiry");
                    });
            } else {
                // Insert new enquiry
                api.post("/api/website/enquiry/insert", formData)
                    .then(() => {
                        toast.success("Enquiry submitted successfully!"); 
                        setFormData({
                            name:"",
                            email:"",   
                            phone:"",
                            message:"",
                            _id:""
                        });
                        getAllEnquiry();
                    }).catch((err) => {
                        console.log(err);
                        toast.error("Failed to submit enquiry");
                    });
            }
        }
 useEffect(() => {
      let isMounted = true;
      const fetchEnquiries = async () => {
        try {
          const res = await api.get("/api/website/enquiry/view");
          const finalData = res.data;
          if (isMounted && finalData.status) {
            setEnquiryList(finalData.enquiryList);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchEnquiries();
      return () => {
        isMounted = false;
      };
    }, []);
    return (<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
    
   <h1 className='text-5xl text-center py-10 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>User Enquiry System</h1>
   <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-10'>
   <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300'>
    <h2 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2'>
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Enquiry Form
    </h2>
    <form action=" " onSubmit={saveEnquiry} className='space-y-5'>
    <div>
        <Label htmlFor="name" value="Your Name" className="text-gray-700 font-semibold mb-2"/>
        <TextInput type="text" value={formData.name} onChange={getValue} name="name" placeholder="Enter your name" required className="mt-1" />
    </div>
    <div>
        <Label htmlFor="email" value="Your Email" className="text-gray-700 font-semibold mb-2"/>
        <TextInput type="email" value={formData.email} onChange={getValue} name="email" placeholder="Enter your email" required className="mt-1" />
    </div>
    <div>
        <Label htmlFor="phone" value="Your Phone" className="text-gray-700 font-semibold mb-2"/>
        <TextInput type="tel" value={formData.phone} onChange={getValue} name="phone" placeholder="Enter your phone" required className="mt-1" />
    </div>
    <div>
        <Label htmlFor="message" value="Your Message" className="text-gray-700 font-semibold mb-2"/>
        <Textarea name="message" value={formData.message} onChange={getValue} placeholder="Enter your message" required rows={4} className="mt-1"/>
    </div>
    <div className='pt-2'>
        <ToastContainer position="top-right" autoClose={3000} />
        <Button type="submit" className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>
            {formData._id ? "✓ Update Enquiry" : "+ Submit Enquiry"}
        </Button>
    </div>
    </form>
   </div>
   <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} setFormData={setFormData} />
   </div>
    </div>);
}

export default Enquiry;