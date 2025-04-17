import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useLocation } from 'react-router-dom'
import { Button } from './ui/button'
 
let filterData = [
  {
    filterType: "Profile",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  }, 
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Mumbai"]
  },
  {
    filterType: "WorkType",
    array: ["Work From Home" ]
  }, 
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"] // Replaced with slider anyway
  },
]

const FilterCard = ({setFilters}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [salaryRange, setSalaryRange] = useState([20]);

  const pathnames = useLocation();
  const pathname = pathnames.pathname.split("/")[1];
     
  const dispatch = useDispatch();
  const { allJobs, allInternships } = useSelector((state) => state.job);

  const [selectedLocations, setSelectedLocations] = useState([])
  
  const toggleLocation = (loc) => {
    if(loc != null){
        const updatedLocations = selectedLocations.includes(loc)
          ? selectedLocations.filter((l) => l !== loc)
          : [...selectedLocations, loc];
        setSelectedLocations(updatedLocations);
        changeHandler("location", updatedLocations);
   } else {
    changeHandler("location", []);
   }
  };

  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const toggleWorkType = (type, checked) => {
    let updated = [];
    if (checked) {
      updated = [...selectedWorkTypes, type];
    } else {
      updated = selectedWorkTypes.filter(t => t !== type);
    }
 
    setSelectedWorkTypes(updated);
    changeHandler("workType", updated); 
  };

  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const toggleProfile = (profile) => {
    setSelectedProfiles((prevProfiles) => {
      let updated;
      if (prevProfiles.includes(profile)) {
        updated = prevProfiles.filter((p) => p !== profile); // Unselect
      } else {
        updated = [...prevProfiles, profile]; // Select
      }

      changeHandler("profile", updated); // Update filter state
      return updated;
    });
  };

  const mergedFilters = filterData.map((filter) => {
    const baseList = pathname === "jobs" ? allJobs : allInternships;
    if (baseList.length === 0) return filter;

    let dynamicValues = [];

    if (filter.filterType === "Location") {
      dynamicValues = baseList.map((job) => job.location);
    } else if (filter.filterType === "Profile") {
      dynamicValues = baseList.map((job) => job.title);
    } else if (filter.filterType === "Salary") {
      dynamicValues = baseList.map((job) => job.salary);
    }

    const mergedArray = Array.from(new Set([...filter.array, ...dynamicValues]));

    return {
      ...filter,
      array: mergedArray
    };
  });

  const changeHandler = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const salaryMarks = {
    0: 0,
    20: 2000,
    40: 4000,
    60: 6000,
    80: 8000,
    100: 10000,
    120: 100000
  };

  const AnnualIncomeMarks = {
    0: 0,
    20: 200000,
    40: 400000,
    60: 600000,
    80: 800000,
    100: 1000000,
    120: 1200000,
  };
   
  const clearAllHandler = () => {
      setFilters({
      profile: [],
      location: [],
      workType: [],
      salary: 0,
    });
    setSelectedLocations([]);
    setSelectedWorkTypes([]);
    setSelectedProfiles([]);
    setSalaryRange([20]);
  }

  return (
    <div className='w-full bg-white p-3 sm:p-4 rounded-md shadow-md text-sm sm:text-base'>
      <div className="flex justify-between items-center">
        <h1 className='font-bold text-base sm:text-lg'>{`${pathname === "jobs" ? "Filter Jobs" : "Filter Internships"}`}</h1>
        <Button 
          onClick={clearAllHandler} 
          variant="ghost" 
          size="sm" 
          className='text-sm text-blue-700 font-medium hover:text-blue-500 duration-200 px-2 h-8'
        >
          Clear all
        </Button>
      </div>
      <hr className='mt-3 mb-4' />
      
      {/* Radio Filters */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {mergedFilters.map((data, index) => (
          <div key={index}>
            {data.filterType === "Salary" ? (
              <div className="mt-4">
                <h1 className="font-bold text-base sm:text-lg">
                  {`${pathname === "jobs" ? "Annual Salary(in lakhs)" : "Monthly stipend (₹)"}`}
                </h1>
                <Slider
                  defaultValue={salaryRange}
                  value={salaryRange}
                  onValueChange={(val) => {
                    setSalaryRange(val);
                    const salaryVal = pathname === "jobs" ? AnnualIncomeMarks[val[0]] : salaryMarks[val[0]];
                    changeHandler("salary", salaryVal);
                  }}
                  max={120}
                  step={20}
                  className="w-full sm:w-[90%] mt-4"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-500 w-full sm:w-[90%]">
                  {pathname !== "jobs" ? (
                    <>
                      <span>0k</span>
                      <span>2k</span>
                      <span>4k</span>
                      <span>6k</span>
                      <span>8k</span>
                      <span>10k</span>
                      <span>10k+</span>
                    </>
                  ) : (
                    <>
                      <span>0L</span>
                      <span>2L</span>
                      <span>4L</span>
                      <span>6L</span>
                      <span>8L</span>
                      <span>10L</span>
                      <span>10L+</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                {data.filterType === "Location" ? (
                  <div className="mt-4">
                    <h1 className="font-bold text-base sm:text-lg mb-2">{data.filterType}</h1>
                    {/* Multi-Select Badge Input */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="w-full min-h-[38px] sm:min-h-[44px] px-2 sm:px-3 py-1 sm:py-2 flex flex-wrap items-center gap-1 sm:gap-2 rounded-md border border-gray-300 hover:border-blue-600 bg-white dark:bg-gray-900 cursor-text">
                          {selectedLocations.length === 0 && (
                            <span className="text-gray-400 text-xs sm:text-sm">Ex. Hyderabad</span>
                          )}
                          {selectedLocations.map((location) => (
                            <div
                              key={location}
                              className="flex items-center gap-1 bg-[#7209b7] text-white text-xs px-2 py-1 rounded-full"
                            >
                              {location}
                              <button
                                className="hover:text-gray-200"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleLocation(location)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="w-[205px] p-0">
                        <Command>
                          <CommandInput placeholder="Search location..." />
                          <CommandList>
                            {selectedLocations.length > 0 && (
                              <CommandItem
                                onSelect={() => {setSelectedLocations([]); toggleLocation(null)}}
                                className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                              >
                                Clear All
                              </CommandItem>
                            )}
                            {data.array.map((loc) => (
                              <CommandItem
                                key={loc}
                                onSelect={() => toggleLocation(loc)}
                                className="flex items-center justify-between"
                              >
                                <span>{loc}</span>
                                {selectedLocations.includes(loc) && (
                                  <span className="text-green-500 font-bold">✔</span>
                                )}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  data.filterType === "WorkType" ? (
                    <>
                      <h1 className="font-bold text-base sm:text-lg mt-4 mb-2">{data.filterType}</h1>
                      {/* Work Type Filters */}
                      <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                          id="wfh"
                          checked={selectedWorkTypes.includes("Work from home")}
                          onCheckedChange={(checked) => toggleWorkType("Work from home", checked)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="wfh" className="text-sm">Work From Home</Label>
                      </div>
                      <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                          id="inOffice"
                          checked={selectedWorkTypes.includes("In Office")}
                          onCheckedChange={(checked) => toggleWorkType("In Office", checked)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="inOffice" className="text-sm">In Office</Label>
                      </div>
                      <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                          id="partTime"
                          checked={selectedWorkTypes.includes("Part Time")}
                          onCheckedChange={(checked) => toggleWorkType("Part Time", checked)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="partTime" className="text-sm">Part-time</Label>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className='font-bold text-base sm:text-lg mt-4 mb-2'>{data.filterType}</h1>
                      {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        return (
                          <div key={itemId} className="flex items-center space-x-2 my-2">
                            <Checkbox
                              id={itemId}
                              checked={selectedProfiles.includes(item)}
                              onCheckedChange={(checked) => {
                                toggleProfile(item);
                              }}
                              className="h-4 w-4"
                            />
                            <Label htmlFor={itemId} className="text-sm">{item}</Label>
                          </div>
                        );
                      })}
                    </>
                  )
                )}
              </>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard;