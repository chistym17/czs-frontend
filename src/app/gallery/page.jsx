"use client";
import Navbar from "@/components/Navbar";
import {
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample photo data - replace with your actual photos
  const photos = [
    {
      id: 1,
      src: "/assets/gallery/2021_champ.webp",
      title: "Championship Final 2024",
      category: "celebrations",
      year: "2023",
    },
    {
      id: 2,
      src: "/assets/gallery/2017_champ.webp",
      title: "Championship Final 2017",
      category: "celebrations",
      year: "2023",
    },
    {
      id: 3,
      src: "/assets/gallery/ceremony1.webp",
      title: "Opening Ceremony",
      category: "ceremony",
      year: "2023",
    },
    {
      id: 4,
      src: "/assets/gallery/ceremony2.webp",
      title: "Opening Ceremony",
      category: "ceremony",
      year: "2023",
    },
    {
      id: 5,
      src: "/assets/gallery/ceremony3.webp",
      title: "Opening Ceremony",
      category: "ceremony",
      year: "2023",
    },
    {
      id: 6,
      src: "/assets/gallery/finals1.webp",
      title: "Victory Moment",
      category: "finals",
      year: "2022",
    },
    {
      id: 7,
      src: "/assets/gallery/finals2.webp",
      title: "Victory Moment",
      category: "finals",
      year: "2022",
    },
    {
      id: 8,
      src: "/assets/gallery/meteors.webp",
      title: "Team celebration",
      category: "celebrations",
      year: "2023",
    },
  ];

  const categories = [
    { id: "all", name: "All Photos", icon: Camera },
    { id: "finals", name: "Finals", icon: Trophy },
    { id: "celebrations", name: "Celebrations", icon: Users },
    { id: "ceremony", name: "Ceremonies", icon: Calendar },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const openLightbox = (photo) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[prevIndex]);
  };

  return (
    <div>
      <Navbar />
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-blue-200">
              <Camera className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                Tournament Memories
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 mb-6">
              GALLERY
            </h1>

            <div className="flex justify-center items-center mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-4"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Relive the most memorable moments from our previous tournaments.
              Each photo tells a story of{" "}
              <span className="text-blue-600 font-semibold">passion</span>,
              <span className="text-blue-600 font-semibold"> dedication</span>,
              and
              <span className="text-blue-600 font-semibold"> triumph</span>.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                      : "bg-white/80 text-blue-700 hover:bg-blue-50 border border-blue-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-blue-100"
                onClick={() => openLightbox(photo)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {photo.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{photo.year} Tournament</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                No photos found
              </h3>
              <p className="text-gray-600">
                Try selecting a different category
              </p>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">5+</h3>
              <p className="text-gray-600">Years of Memories</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">500+</h3>
              <p className="text-gray-600">Photos Captured</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-800 mb-2">1000+</h3>
              <p className="text-gray-600">Memorable Moments</p>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-screen object-contain rounded-lg"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white text-xl font-bold mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80">{selectedImage.year} Tournament</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
