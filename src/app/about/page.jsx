import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-5">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg">
              Welcome to CZS SUPER CUP - your ultimate destination for
              everything football.
            </p>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="container mx-auto py-10 px-4 md:px-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                Our mission is to bring the joy, excitement, and camaraderie of
                football to fans across this school. We aim to create a
                community where footballers can connect, learn, and celebrate
                the beautiful game.
              </p>
            </div>
            <img
              src="https://via.placeholder.com/500x300"
              alt="Football Mission"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mt-10">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Football Vision"
              className="rounded-lg shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                An event where past and presents students of Cumilla Zilla
                School come and took part in this tournament.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gray-200 py-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our History</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Founded in 2022, Football Hub started as a small blog sharing
              match previews and analysis. Over time, we grew into a
              comprehensive platform offering live scores, in-depth articles,
              and interactive features for fans worldwide.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto py-10 px-4 md:px-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member Card */}
            {["John Doe", "Jane Smith", "Mike Brown"].map((member, index) => (
              <div key={index} className="card bg-white shadow-lg">
                <div className="card-body items-center text-center">
                  <img
                    src={`https://via.placeholder.com/150?text=${
                      member.split(" ")[0]
                    }`}
                    alt={member}
                    className="rounded-full mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-bold">{member}</h3>
                  <p className="text-gray-600">Football Analyst</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-500 text-white py-10 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Love football as much as we do? Be part of the action and never
              miss a moment!
            </p>
            <button className="btn btn-primary bg-white text-blue-500 hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default page;
