import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast } from "react-toastify";


function EnquiryList({data,getAllEnquiry,setFormData}) {
    let deleteRow=(delId)=>{
        axios.delete(`http://localhost:3000/api/website/enquiry/delete/${delId}`).then(()=>{
            toast.success("Enquiry deleted successfully!");
            getAllEnquiry();
        }).catch((err)=>{
            console.log(err);
        });
    }
let editRow = (editId) => {
   axios.get(`http://localhost:3000/api/website/enquiry/single/${editId}`)
     .then((res) => {
       let data = res.data;
       if (data.status && data.enquiryData) {
         setFormData({
           name: data.enquiryData.name || "",
           email: data.enquiryData.email || "",
           phone: data.enquiryData.phone || "",
           message: data.enquiryData.message || "",
           _id: editId
         });
       }
     })
     .catch((err) => {
       console.log(err);
     });
};

   
    return (<div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300'>
    <h2 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2'>
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      Enquiry List
    </h2>
     <div className="overflow-x-auto rounded-lg shadow-md">
      <Table hoverable>
        <TableHead className="bg-gradient-to-r from-blue-600 to-purple-600">
          <TableRow>
            <TableHeadCell className="text-white font-semibold">#</TableHeadCell>
            <TableHeadCell className="text-white font-semibold">Name</TableHeadCell>
            <TableHeadCell className="text-white font-semibold">Email</TableHeadCell>
            <TableHeadCell className="text-white font-semibold">Phone</TableHeadCell>
           <TableHeadCell className="text-white font-semibold">Message</TableHeadCell>
            <TableHeadCell className="text-white font-semibold text-center">
            Actions
            </TableHeadCell>
          </TableRow>
        </TableHead>
       
        <TableBody className="divide-y divide-gray-200">
             {
            data && data.length > 0 ? data.map((item,index)=>{
            return <TableRow key={index} className="bg-white hover:bg-gray-50 transition-colors duration-200">
            <TableCell className="font-semibold text-gray-700">{index+1}</TableCell>
            <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
            <TableCell className="text-gray-600">{item.email}</TableCell>
            <TableCell className="text-gray-600">{item.phone}</TableCell>
            <TableCell className="text-gray-600 max-w-xs truncate">{item.message}</TableCell>
            <TableCell className="text-center">
              <div className="flex gap-2 justify-center">
                <button onClick={()=>editRow(item._id)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                  ✏️ Edit
                </button>
                <button onClick={()=>deleteRow(item._id)} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium">
                  🗑️ Delete
                </button>
              </div>
            </TableCell>
            </TableRow>
            }) : <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span className="text-lg font-medium">No Enquiry Found</span>
              </div>
            </TableCell>
          </TableRow>
        }
         
        </TableBody>
      </Table>
    </div>
   </div>)
}
export default EnquiryList;