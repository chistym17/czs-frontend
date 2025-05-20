'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import TeamPlayerCard from '../../../components/TeamPlayerCard';
import { fetchTeamDetails } from '../../../config/api';

const TeamDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const loadTeamDetails = async () => {
      try {
        const response = await fetchTeamDetails(params.id);
        if (response.success) {
          setTeam(response.data);
        } else {
          throw new Error(response.message || 'Failed to load team details');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading team details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadTeamDetails();
    }
  }, [params.id]);

  const shouldShowTeamLogo = team?.teamLogo && team.teamLogo.trim() !== '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error loading team details</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={() => router.push('/teams')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Team not found</p>
          <button
            onClick={() => router.push('/teams')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/teams')}
          className="mb-6 flex items-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Teams
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-48 h-48 flex-shrink-0 relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-md">
                {shouldShowTeamLogo && !imgError ? (
                  <Image
                    src={team.teamLogo}
                    alt={`${team.teamName} logo`}
                    fill
                    className="object-contain p-4"
                    priority
                    quality={90}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-blue-200">
                      {team.teamName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-sm border border-blue-100">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {team.teamName}
                  </h1>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Batch Year</p>
                        <p className="text-xl font-semibold text-gray-800">{team.batchYear}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Captain</p>
                        <p className="text-xl font-semibold text-gray-800">{team.captainName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {team.players && team.players.length > 0 && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Squad</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {team.players.map(player => (
                  <TeamPlayerCard
                    key={player._id}
                    player={player}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamDetailsPage; 