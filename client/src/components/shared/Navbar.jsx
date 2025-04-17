import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Info, Phone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import job from "../../assets/job-search.png"
 
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState("home");
    const [navbarBg, setNavbarBg] = useState("bg-white"); // Initial color
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
 
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    // 💡 Scroll detection logic
    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById("hero");
            if (!heroSection) return

            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight

            if (window.scrollY > heroBottom - 80) {
                setNavbarBg("bg-white")
            } else {
                setNavbarBg("bg-gradient-to-r from-sky-50 to-indigo-50")
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const renderNavLinks = () => {
        if (user && user.role === 'Recruiter') {
            return (
                <>
                    <li onClick={() => navigate("/admin/companies")} className={`${location.pathname.startsWith("/admin/companies") ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Companies
                    </li>
                    <li onClick={() => navigate("/admin/jobs")} className={`${location.pathname.startsWith("/admin/jobs") ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Jobs
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li onClick={() => navigate("/")} className={`${location.pathname === "/" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Home
                    </li>
                    <li onClick={() => navigate("/jobs")} className={`${location.pathname === "/jobs" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Jobs
                    </li>
                    <li onClick={() => navigate("/internships")} className={`${location.pathname === "/internships" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Internships
                    </li>
                    <li onClick={() => navigate("/browse")} className={`${location.pathname === "/browse" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                        Browse
                    </li>
                </>
            )
        }
    }

    // Common links for both user types
    const renderCommonLinks = () => {
        return (
            <>
                <li onClick={() => navigate("/about")} className={`${location.pathname === "/about" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                    About Us
                </li>
                <li onClick={() => navigate("/contact")} className={`${location.pathname === "/contact" ? "border-blue-500 text-blue-500 border" : "hover:bg-slate-200"} rounded-3xl py-2 px-4 cursor-pointer`}>
                    Contact Us
                </li>
            </>
        )
    }

    return (
        // ${navbarBg}
        <div className={`transition-colors duration-500 bg-white ease-in-out border-b-2 border-r-zinc-800 shadow-sm sticky top-0 z-50`}>
            <div className='px-4 md:px-6 flex items-center justify-between mx-auto max-w-7xl h-16'>
                {/* Logo */}
                <div onClick={() => navigate("/")} className='cursor-pointer flex items-center'>
                    <span className='flex gap-x-1 items-center'>
                        <img src={job} className='h-8 w-8 md:h-10 md:w-10 relative top-1 left-2' alt="Job Portal Logo" />
                        <span className={`${navbarBg === "bg-white" ? "text-[#7209b7]" : "text-indigo-600"} text-2xl md:text-3xl font-bold`}>Portal</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:!flex items-center gap-4 lg:gap-12'>
                    <ul className='flex font-medium items-center gap-x-1 lg:gap-x-2'>
                        {renderNavLinks()}
                        {/* {renderCommonLinks()} */}
                    </ul>

                    {/* Auth Buttons / User Profile */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline" size="sm" className="hidden sm:!inline-flex">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" size="sm">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col   my-2 text-gray-600'>
                                       {user.role === 'Student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 size={18} />
                                                <Button variant="link">
                                                    <Link to={user.role === 'Student' && "/profile"}>View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut size={18} />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden flex items-center z-[1000]   '>
                    {user && (
                        <Popover className="mr-2">
                            <PopoverTrigger asChild>
                                <Avatar className="   cursor-pointer h-8 w-8">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72">
                                <div>
                                    <div className='flex gap-2'>
                                        <Avatar className="cursor-pointer h-8 w-8">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                       {user.role === 'Student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 size={18} />
                                                <Button variant="link">
                                                    <Link to={user.role === 'Student' && "/profile"}>View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut size={16} />
                                            <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    
                    <button onClick={toggleMobileMenu} className="text-gray-600 p-2">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden h-screen   bg-white border-t border-gray-200 px-4 py-2  s top-0 ">
                    <ul className="flex flex-col space-y-2 py-2">
                        {renderNavLinks()}
                        <li className="border-t border-gray-100 mt-2 pt-2"></li>
                        {renderCommonLinks()}
                    </ul>
                    
                    {!user && (
                        <div className="flex gap-2 py-3 items-center justify-center border-t border-gray-100">
                            <Link to="/login" className="flex-1">
                                <Button variant="outline" className="w-full">Login</Button>
                            </Link>
                            <Link to="/signup" className="flex-1">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                            </Link>
                        </div>
                    )}
                    
                    {user && (
                        <div className="flex flex-col gap-4 py-3 border-t border-gray-100">
                           {user.role === 'Student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 size={18} />
                                                <Button variant="link">
                                                    <Link to={user.role === 'Student' && "/profile"}>View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                            <div className="flex items-center justify-center gap-2 pl-2">
                                <LogOut size={16} />
                                <button onClick={logoutHandler} className="text-gray-700 hover:text-blue-500">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar