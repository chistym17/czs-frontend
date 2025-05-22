import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="text-white py-10 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl font-bold mb-4">About the CZS Super Cup</h1>
            <p className="text-lg max-w-2xl mx-auto">
              The premier football event of Cumilla Zilla School, uniting
              students and alumni through the beautiful game.
            </p>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="container mx-auto py-16 px-4 md:px-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                To foster unity and promote sportsmanship by organizing an
                exciting football tournament that bridges generations and
                celebrates talent from Cumilla Zilla School.
              </p>
            </div>
            <img
              src="/assets/photos/COVER2.jpg" // Replace with actual image
              alt="CZS Ground"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
            <img
              src="/assets/photos/COVER3.jpg" // Replace with actual image
              alt="CZS Match"
              className="rounded-lg shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                To create a legacy where past and present students of Cumilla
                Zilla School come together annually to celebrate football and
                community.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Our History</h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Launched in 2022, the CZS Super Cup started as a grassroots
              initiative and quickly became a flagship event for Cumilla Zilla
              School. Each year, it gathers alumni and current students for
              thrilling matches and unforgettable memories.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto py-16 px-4 md:px-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Raiyan Chowdhury", "Tariq Hasan", "Iftekhar Ahmed"].map(
              (member, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 text-center"
                >
                  <img
                    src={`https://via.placeholder.com/150?text=${
                      member.split(" ")[0]
                    }`}
                    alt={member}
                    className="rounded-full mb-4 border-4 border-blue-500 mx-auto"
                  />
                  <h3 className="text-xl font-bold">{member}</h3>
                  <p className="text-gray-600">Organizer</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {["COVER6.jpg", "COVER4.jpg", "COVER5.jpg"].map((img, idx) => (
                <img
                  key={idx}
                  src={`/assets/photos/${img}`} // Replace with actual paths
                  alt={`Gallery ${idx + 1}`}
                  className="rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-14 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Join the Legacy</h2>
            <p className="text-lg mb-6">
              Whether you're a player, a supporter, or an alumnus — CZS Super
              Cup is your home of football.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100">
              Follow on Facebook
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default page;
