import React from 'react';

export const StatsCounter = () => {
  return (
    <div className='w-[94%] mx-auto px-5 md:px-20 grid  grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 mt-20 pb-20'>
      {/* Stat 1 */}
      <div className='flex flex-col items-center justify-center gap-y-3 md:border-r-2 border-gray-200 md:pr-10'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl text-blue-600 font-bold'>300K+</h1>
        <span className='text-base md:text-lg lg:text-xl text-gray-700 font-medium text-center'>companies hiring</span>
      </div>

      {/* Stat 2 */}
      <div className='flex flex-col items-center justify-center gap-y-3 md:border-r-2 border-gray-200 md:pr-10'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl text-blue-600 font-bold'>10K+</h1>
        <span className='text-base md:text-lg lg:text-xl text-gray-700 font-medium text-center'>new openings everyday</span>
      </div>

      {/* Stat 3 */}
      <div className='flex flex-col items-center justify-center gap-y-3 md:border-r-2 border-gray-200 md:pr-10'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl text-blue-600 font-bold'>21Mn+</h1>
        <span className='text-base md:text-lglg:text-xl text-gray-700 font-medium text-center'>active students</span>
      </div>

      {/* Stat 4 */}
      <div className='flex flex-col items-center justify-center gap-y-3'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl text-blue-600 font-bold'>600K+</h1>
        <span className='text-base md:text-lg lg:text-xl text-gray-700 font-medium text-center'>learners</span>
      </div>
    </div>
  );
};
