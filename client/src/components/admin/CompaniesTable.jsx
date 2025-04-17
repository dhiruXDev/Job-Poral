import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal ,Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from "../ui/button";
import {setCompanies, setSearchCompanyByText} from '@/redux/companySlice'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "../ui/dialog";
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
 
const CompaniesTable = () => {
    const {companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const [deleteModal,setDeleteModal] = useState(false);
    const [selectedCompany,setSelectedCompany] =useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllCompanies = async()=>{
                try {
                    const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                    if(res.data.success){
                        dispatch(setCompanies(res.data.companies));
                    }
                } catch (error) {
                    console.log(error);
                }
   }



    const handleDelete = async()=>{
         try {
             const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${selectedCompany._id}`, {withCredentials:true});
             setDeleteModal(false);
             if(res.data.success){
                 getAllCompanies(); // Call the function returned by the hook
                 navigate("/admin/companies");
             }
            toast.success(res.data.message);
         } catch (error) {
             console.log("Error during deleting the Company",error);
             toast.error(error.response.data.message);
         }
         setDeleteModal(false);
    }
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company ,index) => (
                            <tr key={index}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 ">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>{setDeleteModal(true) ; setSelectedCompany(company);}} className='flex   w-full  gap-2 cursor-pointer mt-4  '>
                                                 <Trash2  className=' w-5 text-black '/>
                                                 <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>

      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold">{selectedCompany?.name}</span> company and remove all jobs that have been posted under it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            
        </div>
    )
}

export default CompaniesTable