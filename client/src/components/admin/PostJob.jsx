import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
 
    const [input, setInput] = useState({
        // existing fields...
        title: "", description: "", requirements: "", salary: "", location: "",
        jobType: "", experience: "", position: 0, duration: "", Work_Type: "", companyId: "",
        deadline: "",
        workingDays: 7,
        eligibility: [""],
        detailedDescription: [{ heading: "", points: [""] }],
         contact: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
   
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const selectModeChangeHandler = (value)=>{
        setInput({...input, Work_Type: value});
    }
    const selectJobTypeChangeHandler = (value)=>{
        setInput({...input, jobType: value});
    }
    const addEligibility = () => {
        setInput(prev => ({ ...prev, eligibility: [...prev.eligibility, ""] }));
    };
    
    const handleEligibilityChange = (index, value) => {
        const updated = [...input.eligibility];
        updated[index] = value;
        setInput(prev => ({ ...prev, eligibility: updated }));
    };
    
    const addDescriptionSection = () => {
        setInput(prev => ({
            ...prev,
            detailedDescription: [...prev.detailedDescription, { heading: "", points: [""] }]
        }));
    };
    
    const handleHeadingChange = (index, value) => {
        const updated = [...input.detailedDescription];
        updated[index].heading = value;
        setInput(prev => ({ ...prev, detailedDescription: updated }));
    };
    
    const handlePointChange = (secIndex, pointIndex, value) => {
        const updated = [...input.detailedDescription];
        updated[secIndex].points[pointIndex] = value;
        setInput(prev => ({ ...prev, detailedDescription: updated }));
    };
    
    const addPointToSection = (index) => {
        const updated = [...input.detailedDescription];
        updated[index].points.push("");
        setInput(prev => ({ ...prev, detailedDescription: updated }));
    };
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try { 
            console.log("alls",input)
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            console.log("Respose from Create Job" ,res);
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='   overflow-x-hidden'>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 '>
                <form onSubmit = {submitHandler} className='p-8 max-w-4xl  border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                placeholder="Software Developer"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Job Description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                       
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                placeholder="Requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                placeholder="New Delhi"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                        <Label htmlFor="jobType">Job Type</Label>
                        <Select onValueChange={selectJobTypeChangeHandler}>
                                    <SelectTrigger className="w-[180px] mt-1">
                                        <SelectValue placeholder="Select Job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"Job"}>Job</SelectItem>
                                            <SelectItem value={"Internship"}>Internship</SelectItem>
                                         </SelectGroup>
                                    </SelectContent>
                        </Select>
 
                    </div>


                        <div>
                        <Label htmlFor="Work_Type">Work Type</Label>
                        <Select onValueChange={selectModeChangeHandler}>
                                    <SelectTrigger className="w-[180px] mt-1">
                                        <SelectValue placeholder="Select Working Mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"Work from home"}>Work from home</SelectItem>
                                            <SelectItem value={"In Office"}>In Office</SelectItem>
                                            <SelectItem value={"Part Time"}>Part Time</SelectItem>      
                                        </SelectGroup>
                                    </SelectContent>
                        </Select>
 
                    </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="Fresher/Experienced"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Duration</Label>
                            <Input
                                type="text"
                                name="duration"
                                value={input.duration}
                                onChange={changeEventHandler}
                                placeholder="6 months/1 year"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                           {/* Deadline */}
                           <div>
                            <Label>Application Deadline</Label>
                            <Input
                                type="date"
                                name="deadline"
                                value={input.deadline}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Working Days */}
                        <div>
                            <Label>Working Days</Label>
                            <Input
                                type="number"
                                name="workingDays"
                                placeholder="e.g. 5 (days)"
                                value={input.workingDays}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                placeholder="eg. 2000 - 5000 or 2000"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Eligibility */}
                        <div className='col-span-2'>
                            <Label>Eligibility Criteria</Label>
                            {
                                input.eligibility.map((item, index) => (
                                    <Input
                                        key={index}
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleEligibilityChange(index, e.target.value)}
                                        placeholder={`Eligibility ${index + 1}`}
                                        className="focus-visible:ring-0 my-1"
                                    />
                                ))
                            }
                            <Button type="button" onClick={addEligibility} className="my-2">+ Add Eligibility</Button>
                        </div>
                        {/* Contact for Organisation */}
                        <div className='col-span-2'>
                            <Label>Contact for Organisation</Label>
                            <Input
                                type="text"
                                name="contact"
                                placeholder="Phone number, Email, or LinkedIn"
                                value={input.contact}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-0 my-1"
                            />
                        </div>


                        {/* Detailed Description */}
                        <div className='col-span-2'>
                            <Label>Detailed Description</Label>
                            {
                                input.detailedDescription.map((section, secIndex) => (
                                    <div key={secIndex} className="mb-4 p-2 border rounded-md">
                                        <Input
                                            type="text"
                                            placeholder="Heading"
                                            value={section.heading}
                                            onChange={(e) => handleHeadingChange(secIndex, e.target.value)}
                                            className="focus-visible:ring-0 my-1"
                                        />
                                        {
                                            section.points.map((point, ptIndex) => (
                                                <Input
                                                    key={ptIndex}
                                                    type="text"
                                                    value={point}
                                                    onChange={(e) => handlePointChange(secIndex, ptIndex, e.target.value)}
                                                    placeholder={`Point ${ptIndex + 1}`}
                                                    className="focus-visible:ring-0 my-1"
                                                />
                                            ))
                                        }
                                        <Button type="button" onClick={() => addPointToSection(secIndex)} className="mt-1">+ Add Point</Button>
                                    </div>
                                ))
                            }
                            <Button type="button" onClick={addDescriptionSection}>+ Add New Section</Button>
                        </div>

                        
 
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px] mt-5">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div> 
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob