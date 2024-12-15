import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const page = () => {
  const team = {
    logo: "path/to/logo.png", // Replace with actual path or URL
    name: "The Champions FC",
    about:
      "The Champions FC is a dedicated football team known for its teamwork and skillful plays. Established in 2010, the team has won numerous regional tournaments.",
    captain: "John Doe",
    viceCaptain: "Jane Smith",
    players: [
      "Alice Brown",
      "Bob Carter",
      "Charlie Davis",
      "Daniel Evans",
      "Emily Frost",
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          {/* Team Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <img
              src={team.logo}
              alt={`${team.name} Logo`}
              className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">{team.name}</h1>
          </div>

          {/* Team Details */}
          <div className="p-6 space-y-4">
            {/* About the Team */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                About the Team
              </h2>
              <p className="text-gray-600">{team.about}</p>
            </div>

            {/* Captain and Vice-Captain */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-gray-700">Captain</h3>
                <p className="text-gray-600">{team.captain}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-gray-700">
                  Vice Captain
                </h3>
                <p className="text-gray-600">{team.viceCaptain}</p>
              </div>
            </div>

            {/* Players */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Players</h2>
              <ul className="list-disc list-inside text-gray-600">
                {team.players.map((player, index) => (
                  <li key={index}>{player}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
