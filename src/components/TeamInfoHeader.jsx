import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

const TeamInfoHeader = ({ teamData, onLogoUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

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
    try {
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('teamId', teamData._id);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/upload-logo`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload logo');
      }

      const data = await response.json();
      if (data.success) {
        onLogoUpload(data.logoUrl);
        toast.success('Team logo updated successfully!');
      } else {
        throw new Error(data.message || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error(error.message || 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Team Logo and Info */}
        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32 bg-white rounded-full overflow-hidden group">
            {teamData?.logo ? (
              <Image
                src={teamData.logo}
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
            <p className="text-2xl font-bold">{teamData?.players?.length || 0}</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center min-w-[120px]">
            <p className="text-sm font-medium text-blue-100">Team ID</p>
            <p className="text-sm font-mono">{teamData?._id?.slice(-6)}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg transition-colors">
          Edit Team Info
        </button>
        <button className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg transition-colors">
          View Team Stats
        </button>
      </div>
    </div>
  );
};

export default TeamInfoHeader; 