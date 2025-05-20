const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

export const API_ENDPOINTS = {
  teams: `${API_BASE_URL}/api/teams`,
  teamDetails: (id) => `${API_BASE_URL}/api/teams/${id}`,
};

export const fetchTeams = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.teams);
    if (!response.ok) throw new Error('Failed to fetch teams');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchTeamDetails = async (id) => {
  try {
    const response = await fetch(API_ENDPOINTS.teamDetails(id));
    if (!response.ok) throw new Error('Failed to fetch team details');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
}; 