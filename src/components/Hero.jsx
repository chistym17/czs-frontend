import '../app/globals.css'
import Marquee from 'react-fast-marquee';
const Hero = () => {
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
    <div className="relative">
      <div 
        className="h-[70vh] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/assets/photos/COVER.png')" }}
      >
        <div className="absolute inset-0 "> 
         
        </div>
      </div>

      <div className="absolute bottom-0 w-full  ">
        <div className="max-w-3xl mx-auto bg-black bg-opacity-40 py-3 rounded-2xl">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
          >
            {logos.map((logo, index) => (
              <div key={index} className=" w-64">
                <img 
                  src={logo} 
                  alt={`Partner logo ${index + 1}`} 
                  className="h-28 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Hero;
