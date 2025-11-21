'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 3D Globe Component
function Globe() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe={true}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
      
      {/* Floating points around the globe */}
      {[...Array(20)].map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 20);
        const theta = Math.sqrt(20 * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi) * 2.5;
        const y = Math.sin(theta) * Math.sin(phi) * 2.5;
        const z = Math.cos(phi) * 2.5;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Navigation Component
function Navigation3D() {
  const [activeItem, setActiveItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'destinations', label: 'Destinations', href: '/destinations' },
    { id: 'experiences', label: 'Experiences', href: '/experiences' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="nav-3d bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/10">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              className={`nav-item-3d px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeItem === item.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={() => setActiveItem(item.id)}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: activeItem === item.id ? 1.1 : 1,
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero Section with 3D Background
function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
          <Globe />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation3D />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 glow-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Voyage<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">3D</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Experience travel like never before with our mesmerizing 3D navigation system. 
          Explore destinations in an immersive 3D environment.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Destinations
          </motion.button>
          
          <motion.button
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Experiences
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <p className="text-sm mt-2">Scroll to explore</p>
      </motion.div>
    </div>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      title: "3D Destinations",
      description: "Explore destinations in stunning 3D environments with interactive maps",
      icon: "🌍"
    },
    {
      title: "Virtual Tours",
      description: "Take virtual tours of hotels, resorts, and attractions before booking",
      icon: "🏨"
    },
    {
      title: "Immersive Planning",
      description: "Plan your trip using our 3D itinerary builder with real-time previews",
      icon: "🗺️"
    },
    {
      title: "AR Experiences",
      description: "Augmented reality features to enhance your travel planning",
      icon: "👓"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Revolutionary Travel Experience
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Destinations Section
function DestinationsSection() {
  const destinations = [
    {
      name: "Santorini, Greece",
      image: "https://source.unsplash.com/600x400/?santorini",
      description: "Experience the stunning sunsets and white-washed buildings",
      price: "$1,299"
    },
    {
      name: "Bali, Indonesia",
      image: "https://source.unsplash.com/600x400/?bali",
      description: "Tropical paradise with beautiful beaches and temples",
      price: "$999"
    },
    {
      name: "Tokyo, Japan",
      image: "https://source.unsplash.com/600x400/?tokyo",
      description: "Modern metropolis with rich cultural heritage",
      price: "$1,599"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Destinations</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <p className="text-xl text-blue-400 font-semibold">{destination.price}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{destination.description}</p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready for Your Next Adventure?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join thousands of travelers who have experienced the future of travel planning with our 3D navigation system.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg mr-4 shadow-lg hover:shadow-xl transition-shadow">
            Book Now
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Voyage3D
            </h3>
            <p className="text-gray-400">
              Revolutionizing travel with immersive 3D experiences and advanced navigation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Europe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Americas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Africa</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2023 Voyage3D. All rights reserved. Experience the future of travel.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D elements
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <CTASection />
      <Footer />
    </main>
  );
}