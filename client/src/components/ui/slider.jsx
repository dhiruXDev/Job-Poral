import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative h-2 w-full grow overflow-hidden rounded-full  bg-[#7209b7] ">
      <SliderPrimitive.Range className="absolute h-full   bg-gray-300  " />
    </SliderPrimitive.Track>
    
     
    <SliderPrimitive.Thumb
  className="relative block h-3 w-3 rounded-full bg-[#7209b7] cursor-pointer  
             before:content-[''] before:absolute before:inset-[-4px] before:rounded-full 
             before:border-[3px] before:border-blue-500 before:z-[-1]
             transition-none   
             focus-visible:outline-none 
             disabled:pointer-events-none disabled:opacity-50" />


      
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
