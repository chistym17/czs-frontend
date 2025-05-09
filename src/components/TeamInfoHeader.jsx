import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import EditTeamModal from './EditTeamModal';

const TeamInfoHeader = ({ team, onLogoUpload, onTeamUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [teamData, setTeamData] = useState(team);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchTeamLogo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/team-logo/${teamData._id}`);
        const data = await response.json();
        console.log('data', data);
        if (data.success && data.data.logoUrl) {
          setLogoUrl(data.data.logoUrl);
        }
      } catch (error) {
        console.error('Error fetching team logo:', error);
      }
    };

    if (teamData?._id) {
      fetchTeamLogo();
    }
  }, [teamData._id]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading('Updating team logo...');
    
    try {
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('teamId', teamData._id);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/upload-team-logo`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload logo');
      }

      const data = await response.json();
      if (data.success) {
        toast.dismiss(loadingToast);
        onLogoUpload(data.logoUrl);
        setLogoUrl(data.logoUrl);
      } else {
        throw new Error(data.message || 'Failed to upload logo');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error uploading logo:', error);
      toast.error(error.message || 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  //function to show the updated team info

  const handleUpdate = async (updatedTeam) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${teamData._id}`);
      const data = await response.json();

      console.log('updated team data', data);


      
      if (data.success) {
        setTeamData(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch updated team data');
      }
    } catch (error) {
      console.error('Error fetching updated team:', error);
      toast.error('Failed to fetch updated team data');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Team Logo and Info */}
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32 bg-white rounded-full overflow-hidden group">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${teamData.teamName} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No Logo</span>
                </div>
              )}
              <label 
                htmlFor="logo-upload" 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              >
                <span className="text-sm font-medium">
                  {isUploading ? 'Uploading...' : 'Upload Logo'}
                </span>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                disabled={isUploading}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{teamData?.teamName}</h1>
              <div className="space-y-1">
                <p className="text-blue-100">Batch Year: {teamData?.batchYear}</p>
                <p className="text-blue-100">Captain: {teamData?.captainName}</p>
                <p className="text-blue-100">Vice Captain: {teamData?.viceCaptainName}</p>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="flex space-x-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center min-w-[120px]">
              <p className="text-sm font-medium text-blue-100">Total Players</p>
              <p className="text-2xl font-bold">{Array.isArray(teamData?.players) ? teamData.players.length : 0}</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center min-w-[120px]">
              <p className="text-sm font-medium text-blue-100">Team ID</p>
              <p className="text-sm font-mono">{teamData?._id?.slice(-6)}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Edit Team Info
          </button>
          <button className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg transition-colors">
            View Team Stats
          </button>
        </div>
      </div>

      <EditTeamModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teamData={teamData}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default TeamInfoHeader; 