'use client';

const Briefing = () => {
  return (
    <div className='py-16 bg-gradient-to-b from-blue-100 to-white'>
      <div className='flex justify-center mt-24 space-x-2'>
        <div className='text-center mb-12'>
          <h2 className='text-6xl font-extrabold text-gray-800 mb-4'>
            32 TEAMS !
          </h2>
          <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
          <p className='text-xl text-gray-700 max-w-2xl mx-auto py-5'>
            Experience the thrill of competition as the best teams battle for
            glory in the CZS Super Cup.
          </p>
          <p className='text-lg text-gray-700 max-w-2xl mx-auto mt-4 py-5'>
            Get ready for heart-pounding action, unforgettable moments, and a
            tournament like no other!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Briefing;
