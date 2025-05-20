import '../app/globals.css';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

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
    <div className='relative'>
      <div className='h-[65vh] relative'>
        <Image
          src="/assets/photos/COVER.png"
          alt="Hero background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Compact, centered marquee */}
      <div className='absolute left-1/2 bottom-[-48px] sm:bottom-[-60px] transform -translate-x-1/2 z-20 w-[90%] sm:w-[85%] md:w-[75%]'>
        <div className='mx-auto bg-blue rounded-lg shadow-md p-1 sm:p-2 max-w-[700px]'>
          <div className='relative overflow-hidden'>
            {/* Fade edges */}
            <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/30 via-transparent to-white/30' />

            <Marquee speed={70} gradient={false} pauseOnHover={true}>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className='mx-12 sm:mx-8 w-16 sm:w-20 transform transition-transform hover:scale-105'
                >
                  <Image
                    src={logo}
                    alt={`Partner logo ${index + 1}`}
                    width={80}
                    height={80}
                    loading="lazy"
                    quality={75}
                    className='h-50 sm:h-50 w-auto object-contain filter drop-shadow-sm hover:brightness-105'
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
