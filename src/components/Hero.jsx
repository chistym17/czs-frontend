import '../app/globals.css';

const Hero = () => {
  return (
    <div className='relative'>
      <div
        className='h-[70vh] bg-cover bg-center bg-no-repeat relative'
        style={{ backgroundImage: "url('/assets/photos/COVER.png')" }}
      >
        <div className='absolute inset-0 '></div>
      </div>
    </div>
  );
};

export default Hero;
