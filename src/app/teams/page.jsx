'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// Additional styles to make it more responsive for smaller screens
const mediaStyles = `
  @media (max-width: 640px) {
    .team-card {
      width: 100% !important;
      max-width: 280px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    
    .team-card {
      height: 320px !important;
    }
  }
`;

const TeamCard = ({ logo, name, year, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/team-details`); //router.push(`/teams/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='team-card bg-white rounded-lg overflow-hidden cursor-pointer border border-blue-300 shadow-md 
      transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500 
      w-64 h-96 flex flex-col transform-gpu'
    >
      <div
        className='h-48 w-full relative bg-gray-50 flex items-center justify-center p-4 
      transition-all duration-300 hover:bg-blue-50'
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={160}
          height={160}
          objectFit='contain'
          className='max-h-40 transition-transform duration-300 hover:scale-110'
        />
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between border-t border-blue-100'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>{name}</h3>
        <div className='mt-auto'>
          <p className='text-gray-600 text-sm'>Est. {year}</p>
        </div>
      </div>
    </div>
  );
};

const TeamsPage = () => {
  const [mounted, setMounted] = useState(false);

  // Handle mounting for client-side animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock team data - replace with actual data fetching in production
  const teams = [
    {
      id: 1,
      name: 'ELITE FC',
      year: '2018',
      logo: '/assets/logos/20241024_011337.jpg',
    },
    {
      id: 2,
      name: 'SPARK RISERS FC',
      year: '2019',
      logo: '/assets/logos/1733270150179.jpg',
    },
    {
      id: 3,
      name: 'IGNESIOUS',
      year: '2022',
      logo: '/assets/logos/FB_IMG_1733330088970.jpg',
    },
    {
      id: 4,
      name: 'SLYTHRIN',
      year: '2021',
      logo: '/assets/logos/images.png',
    },
    {
      id: 5,
      name: 'FC SCORPIONS',
      year: '2019',
      logo: '/assets/logos/IMG_3688.PNG',
    },
    {
      id: 6,
      name: 'DIABLOS FC',
      year: '2019',
      logo: '/assets/logos/IMG_3689.PNG',
    },
    {
      id: 7,
      name: 'WIZARDS FC',
      year: '2019',
      logo: '/assets/logos/IMG_3690.PNG',
    },
    {
      id: 8,
      name: 'IGNESIOUS',
      year: '2023',
      logo: '/assets/logos/IMG_3691.PNG',
    },
    {
      id: 9,
      name: 'DE METEORS',
      year: '2020',
      logo: '/assets/logos/IMG_3692.PNG',
    },
    {
      id: 10,
      name: 'BLUSTERY RISERS',
      year: '2018',
      logo: '/assets/logos/IMG_3693.PNG',
    },
    {
      id: 11,
      name: 'SPARK RISERS FC',
      year: '2019',
      logo: '/assets/logos/IMG_3694.PNG',
    },
    {
      id: 12,
      name: 'OLD SCHOOL FC',
      year: '2009',
      logo: '/assets/logos/IMG_5663.JPG',
    },
    {
      id: 13,
      name: 'LEIGESTER FC',
      year: '2017',
      logo: '/assets/logos/IMG_20241030_083706.jpg',
    },
    {
      id: 14,
      name: 'GLADIOLUS FC',
      year: '2018',
      logo: '/assets/logos/received_1438075889675861.jpeg.jpg',
    },
    {
      id: 15,
      name: 'SEQUESTERS FC',
      year: '2022',
      logo: '/assets/logos/WhatsApp Image 2024-12-04 at 23.39.31_3a911c20.jpg',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        ${mediaStyles}
      `}</style>

      <Navbar />

      <main className='container mx-auto px-2 sm:px-4 py-6 sm:py-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-sky-600'>
          SUPER CUP TEAMS
        </h1>

        <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center'>
          {teams.map((team, index) => (
            <div
              key={team.id}
              style={{
                opacity: mounted ? 1 : 0,
                animation: mounted
                  ? `fadeIn 0.5s ease-out ${
                      index * 0.1
                    }s forwards, float 3s ease-in-out ${
                      index * 0.1 + 0.5
                    }s infinite`
                  : 'none',
              }}
            >
              <TeamCard
                id={team.id}
                logo={team.logo}
                name={team.name}
                year={team.year}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamsPage;
