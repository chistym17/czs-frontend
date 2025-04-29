import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

// Mock sponsor data - replace with your actual sponsor data
const sponsors = [
  {
    id: 1,
    name: "TechCorp",
    tier: "Diamond",
    logo: "/api/placeholder/200/100",
    banner: "/api/placeholder/800/200",
    description:
      "Leading technology solutions provider and proud main sponsor of this tournament.",
    website: "https://techcorp.example",
    social: {
      instagram: "techcorp",
      facebook: "techcorp",
      twitter: "techcorp",
      linkedin: "techcorp",
    },
  },
  {
    id: 2,
    name: "GamersUnite",
    tier: "Platinum",
    logo: "/api/placeholder/200/100",
    banner: "/api/placeholder/800/200",
    description:
      "Premium gaming gear supplier supporting competitive gaming across the globe.",
    website: "https://gamersunite.example",
    social: {
      instagram: "gamersunite",
      twitter: "gamersunite",
    },
  },
  {
    id: 3,
    name: "SportsFuel",
    tier: "Gold",
    logo: "/api/placeholder/200/100",
    banner: "/api/placeholder/800/200",
    description: "Performance nutrition for athletes and esports competitors.",
    website: "https://sportsfuel.example",
    social: {
      facebook: "sportsfuel",
      instagram: "sportsfuel",
    },
  },
  {
    id: 4,
    name: "MediaStream",
    tier: "Silver",
    logo: "/api/placeholder/200/100",
    banner: "/api/placeholder/800/200",
    description:
      "Streaming platform partnering with tournaments to bring the action to viewers worldwide.",
    website: "https://mediastream.example",
    social: {
      twitter: "mediastream",
      linkedin: "mediastream",
    },
  },
];

// Map tier to color for visual distinction
const tierColors = {
  Diamond: "bg-blue-800",
  Platinum: "bg-blue-700",
  Gold: "bg-blue-600",
  Silver: "bg-blue-500",
  Bronze: "bg-blue-400",
};

// Component for social media icons
const SocialIcon = ({ platform, username }) => {
  const icons = {
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
    twitter: <Twitter size={20} />,
    linkedin: <Linkedin size={20} />,
    website: <Globe size={20} />,
    email: <Mail size={20} />,
  };

  return (
    <a
      href={`https://${platform}.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 transition-colors mr-3"
    >
      {icons[platform]}
    </a>
  );
};

// Individual sponsor card component
const SponsorCard = ({ sponsor }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 transition-transform transform hover:scale-105">
      {/* Banner image */}
      <div className="relative">
        <img
          src={sponsor.banner}
          alt={`${sponsor.name} banner`}
          className="w-full object-cover"
        />
        <div
          className={`absolute top-0 right-0 ${
            tierColors[sponsor.tier]
          } text-white px-4 py-1 rounded-bl-lg font-semibold`}
        >
          {sponsor.tier} Sponsor
        </div>
      </div>

      <div className="p-6">
        {/* Logo and name */}
        <div className="flex items-center mb-4">
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className="w-16 h-16 object-contain mr-4"
          />
          <h3 className="text-2xl font-bold text-gray-800">{sponsor.name}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{sponsor.description}</p>

        {/* Social links */}
        <div className="flex items-center justify-between">
          <div className="flex">
            {sponsor.website && (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors mr-3"
              >
                <Globe size={20} />
              </a>
            )}

            {sponsor.social &&
              Object.entries(sponsor.social).map(([platform, username]) => (
                <SocialIcon
                  key={platform}
                  platform={platform}
                  username={username}
                />
              ))}
          </div>

          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};

// Filter sponsors by tier
const SponsorTier = ({ tier, sponsors }) => {
  const filteredSponsors = sponsors.filter((sponsor) => sponsor.tier === tier);

  if (filteredSponsors.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
        {tier} Sponsors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
};

// Main Sponsors page component
export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Our Sponsors
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're grateful to all our sponsors who make this tournament
            possible. Their support helps us create an amazing experience for
            players and fans alike.
          </p>
        </header>

        <div className="mb-12">
          <SponsorTier tier="Diamond" sponsors={sponsors} />
          <SponsorTier tier="Platinum" sponsors={sponsors} />
          <SponsorTier tier="Gold" sponsors={sponsors} />
          <SponsorTier tier="Silver" sponsors={sponsors} />
          <SponsorTier tier="Bronze" sponsors={sponsors} />
        </div>

        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Sponsor</h2>
          <p className="mb-6">
            Interested in supporting our tournament and reaching our audience?
            We offer various sponsorship packages to fit your marketing goals.
          </p>
          <button className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition-colors">
            Contact Our Sponsorship Team
          </button>
        </div>
      </div>
    </div>
  );
}
