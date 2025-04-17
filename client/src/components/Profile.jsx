import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
   console.log("user",user)
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg shadow-slate-200 rounded-2xl my-5 p-4 md:p-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.profile.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div className="text-center sm:text-left">
                            <h1 className="font-medium text-xl break-words">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div className="flex justify-center sm:justify-end">
                        <Button onClick={() => setOpen(true)} variant="outline">
                            <Pen className="mr-1 h-4 w-4" /> Edit
                        </Button>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="my-5 space-y-3 text-sm md:text-base">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="break-words">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="h-5 w-5 text-blue-500" />
                        <span className="break-words">{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="my-5">
                    <h1 className="font-semibold text-lg mb-2">Skills</h1>
                    <div className="flex flex-wrap gap-2">
                        {
                            user?.profile?.skills?.length > 0
                                ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                                : <span className="text-gray-500">NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className="my-5">
                    <Label className="text-md font-bold">Resume</Label>
                    
                    <div className="mt-1">
                        {
                            isResume && user?.profile?.resume
                                ? <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {user?.profile?.resumeOriginalname                                    }
                                </a>
                                : <span className="text-gray-500">NA</span>
                        }
                    </div>
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg shadow-slate-200 rounded-2xl my-5 p-4 md:p-8 overflow-x-auto">
                <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
