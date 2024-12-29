import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto font-bold text-black">
        <h1 className="text-3xl font-bold text-center mb-6">
          Team Registration
        </h1>
        <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          {/* Team Details */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Team Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your team name"
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Batch Year</span>
            </label>
            <input
              type="text"
              placeholder="Enter which ssc year your team was"
              className="input input-bordered w-full bg-blue-50"
            />
          </div>

          {/* Captain and Vice-Captain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Captain Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter captain's name"
                className="input input-bordered w-full bg-blue-50"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Vice-Captain Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter vice-captain's name"
                className="input input-bordered w-full bg-blue-50"
              />
            </div>
          </div>

          {/* Player Names */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Player Names</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 16 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  className="input input-bordered w-full bg-gray-100"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Register Team</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default page;
