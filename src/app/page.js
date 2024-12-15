import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Greeting  */}
      <div className="h-[400px] bg-white p-5  text-black">
        <h2 className="text-3xl flex items-center justify-center mt-5">
          {" "}
          WELCOME TO THE
        </h2>
        <h3 className="text-3xl flex items-center justify-center">
          CZS SUPER CUP COMMUNITY
        </h3>
        <h4 className="flex items-center justify-center mt-2">
          {" "}
          Register Now to be a part of the CZS SuperCup{" "}
        </h4>
        <h3 className="text-3xl flex items-center justify-center mt-5">
          We are excited to announce that the
        </h3>
        <h3 className="text-3xl flex items-center justify-center mt-2">
          CZS SuperCup is now{" "}
        </h3>
        <h3 className="text-3xl flex items-center justify-center mt-2">
          accepting team registrations!
        </h3>
        <div className="flex items-center justify-center mt-5">
          <button className="btn btn-outline text-3xl font-sans text-black">
            Register Now
          </button>
        </div>
      </div>
      {/* Team Info */}
      <div className="bg-white h-[500px] text-black">
        <div className=" w-full flex-col lg:flex-row flex items-center justify-center gap-x-20 p-8">
          {/* Square card with drop shadow and rounded border */}
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center font-bold">
                TEAM INFO
              </h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
          <div className="divider lg:divider-horizontal "></div>
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center">
            <div className="">
              <h1 className="flex items-center justify-center font-bold">
                TEAM INFO
              </h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full flex-col lg:flex-row flex items-center justify-center gap-x-20 p-8">
          {/* Square card with drop shadow and rounded border */}
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center font-bold">
                TEAM INFO
              </h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
          <div className="divider lg:divider-horizontal "></div>
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center">
            <div className="">
              <h1 className="flex items-center justify-center font-bold">
                TEAM INFO
              </h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="bg-white h-[400px] ">
        <img src="../assets/photos/COVER2.png" />
      </div>
      {/* News & updates */}
      <div className="bg-white h-[400px]">
        <h1 className="flex items-center justify-center text-4xl  text-black">
          News & Updates
        </h1>
        <div className=" w-full flex-col lg:flex-row flex items-center justify-center gap-x-20 p-8">
          {/* Square card with drop shadow and rounded border */}
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>

          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Match Updates */}
      <div className="bg-white h-[200px]">
        <h1 className="flex items-center justify-center text-4xl text-black ">
          Match Updates
        </h1>
        <div className=" w-full flex-col lg:flex-row flex items-center justify-center gap-x-20 p-8">
          {/* Square card with drop shadow and rounded border */}
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>

          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
          <div className="card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60  place-items-center ">
            <div className="">
              <h1 className="flex items-center justify-center">TEAM INFO</h1>
              <p className="flex items-center justify-center ml-6">
                {" "}
                Find your team including info updates,transfer window,contracts
                and more{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* All time Stats */}
      <div className="bg-white flex items-center justify-center  h-[400px] ">
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-white text-black">
          <div className="stat">
            <div className="stat-title text-black">Total Events</div>
            <div className="stat-value">6</div>
          </div>

          <div className="stat">
            <div className="stat-title text-black">Total Clubs</div>
            <div className="stat-value">4,200</div>
          </div>

          <div className="stat">
            <div className="stat-title text-black">Total Players</div>
            <div className="stat-value">1,200</div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
