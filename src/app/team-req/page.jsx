"use client";

import Navbar from "@/components/Navbar";
// pages/team-requirements.jsx

import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function TeamRequirements() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const requirements = [
    {
      title: "Team Size",
      description:
        "Each team must consist of 4-6 players, with at least 1 substitute player.",
      isRequired: true,
    },
    {
      title: "Age Requirement",
      description:
        "All players must be at least 16 years of age to participate.",
      isRequired: true,
    },
    {
      title: "Skill Level",
      description:
        "Teams may consist of players from any skill level, but we recommend at least 2 players with tournament experience.",
      isRequired: false,
    },
    {
      title: "Equipment",
      description:
        "Teams are responsible for bringing their own controllers/equipment. Standard peripherals will be provided for PC setups.",
      isRequired: true,
    },
    {
      title: "Team Captain",
      description:
        "Each team must designate one player as team captain who will be the primary contact person.",
      isRequired: true,
    },
    {
      title: "Availability",
      description:
        "Teams must be available for all scheduled tournament days and times (see Tournament Schedule).",
      isRequired: true,
    },
  ];

  const faqs = [
    {
      question:
        "Can we register with fewer than the required number of players?",
      answer:
        "No, each team must have at least 4 players with a minimum of 1 substitute to ensure you can compete even if a player is unable to attend.",
    },
    {
      question: "Can players be part of multiple teams?",
      answer:
        "No, each player can only be registered to one team for the duration of the tournament.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "Yes, there is a team registration fee of $120 per team. This fee covers tournament operations, venue costs, and prizes.",
    },
    {
      question: "What happens if a player cannot attend?",
      answer:
        "This is why we require substitute players. If a registered player cannot attend, your substitute can take their place.",
    },
    {
      question: "Can we change our team roster after registration?",
      answer:
        "Roster changes can be made up to 7 days before the tournament begins. After that, your roster is locked in.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <Head>
        <title>Team Requirements | Tournament Name</title>
        <meta
          name="description"
          content="Team requirements for participating in our tournament"
        />
      </Head>

      {/* Navigation */}
      {/* <nav className="bg-blue-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-200"
          >
            Tournament Name
          </Link>
          <div className="space-x-6">
            <Link href="/teams" className="hover:text-blue-200">
              Teams
            </Link>
            <Link href="/schedule" className="hover:text-blue-200">
              Schedule
            </Link>
            <Link href="/team-requirements" className="underline font-bold">
              Requirements
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md font-medium transition duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Header */}
      <header className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Team Requirements
          </h1>
          <p className="text-xl max-w-3xl mb-8">
            Please review all team requirements before registering for the
            tournament. All requirements marked as "Required" must be met to
            participate.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-800 hover:bg-blue-100 px-8 py-3 rounded-md font-bold text-lg transition duration-200"
          >
            Register Your Team
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12">
        {/* Requirements section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gray-100">
              {requirements.map((req, index) => (
                <div key={index} className="bg-white p-6 flex flex-col h-full">
                  <div className="flex items-start mb-3">
                    {req.isRequired ? (
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <HelpCircle className="text-blue-400 mr-2 flex-shrink-0" />
                    )}
                    <h3 className="text-xl font-semibold text-blue-900">
                      {req.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 flex-grow">{req.description}</p>
                  <div className="mt-4">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        req.isRequired
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {req.isRequired ? "Required" : "Recommended"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important notices section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Important Notices
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Registration Deadline
                </h3>
                <p className="text-gray-700 mb-4">
                  Team registration closes on July 15th, 2025, at 11:59 PM EST.
                  No late registrations will be accepted. Please ensure all team
                  information is accurate and complete before the deadline.
                </p>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Payment Information
                </h3>
                <p className="text-gray-700">
                  The registration fee must be paid within 48 hours of
                  completing your registration form. Teams with unpaid fees will
                  be placed on a waitlist until payment is received.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-blue-900">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="text-blue-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-blue-500 flex-shrink-0" />
                  )}
                </div>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-gray-700">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Ready to Join the Tournament?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            If your team meets all the requirements, we're excited to have you
            compete!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-200"
            >
              Register Now
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-md border border-blue-300 transition duration-200"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Tournament Name</h3>
              <p className="text-blue-200">
                The premier gaming competition for enthusiasts and professionals
                alike.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-blue-200 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rules"
                    className="text-blue-200 hover:text-white"
                  >
                    Rules
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schedule"
                    className="text-blue-200 hover:text-white"
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-blue-200 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Twitch
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-blue-200 mb-2">
                Stay updated with tournament news
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
            <p>
              &copy; {new Date().getFullYear()} Tournament Name. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
