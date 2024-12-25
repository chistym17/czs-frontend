import Marquee from 'react-fast-marquee';

const LogoMarquee = () => {
  const logos = [
    '/assets/logos/20241024_011337.jpg',
    '/assets/logos/1733270150179.jpg',
    '/assets/logos/FB_IMG_1733330088970.jpg',
    '/assets/logos/images.png',
    '/assets/logos/IMG_3688.PNG',
    '/assets/logos/IMG_3689.PNG',
    '/assets/logos/IMG_3690.PNG',
    '/assets/logos/IMG_3691.PNG',
    '/assets/logos/IMG_3692.PNG',
    '/assets/logos/IMG_3693.PNG',
    '/assets/logos/IMG_3694.PNG',
    '/assets/logos/IMG_5663.JPG',
    '/assets/logos/IMG_20241030_083706.jpg',
    '/assets/logos/received_1438075889675861.jpeg.jpg',
    '/assets/logos/WhatsApp Image 2024-12-04 at 23.39.31_3a911c20.jpg',
  ];

  return (
    <div className='py-16 bg-gradient-to-b from-gray-100 to-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-5xl font-bold text-gray-800 mb-4'>
            32 Teams, One Champion
          </h2>
          <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Experience the thrill of competition as the best teams battle for
            glory in the CZS Super Cup
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8 mx-auto max-w-6xl'>
          <div className='bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-1'>
            <Marquee
              speed={40}
              gradient={true}
              gradientColor={[255, 255, 255]}
              gradientWidth={50}
              pauseOnHover={true}
            >
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className='mx-8 w-48 transform transition-transform hover:scale-100'
                >
                  <img
                    src={logo}
                    alt={`Partner logo ${index + 1}`}
                    className='h-28 w-auto object-contain filter hover:brightness-110'
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <div className='flex justify-center mt-8 space-x-2'>
          <div className='w-3 h-3 rounded-full bg-blue-600'></div>
          <div className='w-3 h-3 rounded-full bg-blue-400'></div>
          <div className='w-3 h-3 rounded-full bg-blue-600'></div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
