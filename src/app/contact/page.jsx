import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Contact() {
  return (
    <main>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-blue-600 mb-4">
                Get in Touch
              </h1>
              <p className="text-gray-600">
                We'd love to hear from you. Fill out the form below, and our
                team will get back to you shortly.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full mt-2 rounded-md border-gray-300 px-4 py-2 bg-sky-100 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full mt-2 rounded-md border-gray-300 px-4 py-2 bg-sky-100 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full mt-2 rounded-md border-gray-300 px-4 py-2 bg-sky-100 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Write your message here"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                  Contact Information
                </h2>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <h3 className="font-medium">📍 Address</h3>
                    <p>Comilla Zilla School,kandirpar,Comilla-3500</p>
                  </li>
                  <li>
                    <h3 className="font-medium">📞 Phone</h3>
                    <p>01631338835</p>
                  </li>
                  <li>
                    <h3 className="font-medium">✉️ Email</h3>
                    <p>contact@example.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
