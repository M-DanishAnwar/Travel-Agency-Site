'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Destination Globe Component
function DestinationGlobe({ destination }) {
  const destinations = {
    paris: { position: [0, 0, 0], color: "#ef4444", name: "Paris, France" },
    tokyo: { position: [3, 0, 0], color: "#3b82f6", name: "Tokyo, Japan" },
    bali: { position: [-3, 0, 0], color: "#10b981", name: "Bali, Indonesia" },
    santorini: { position: [0, 3, 0], color: "#8b5cf6", name: "Santorini, Greece" },
    newyork: { position: [0, -3, 0], color: "#f59e0b", name: "New York, USA" }
  };

  return (
    <group>
      {Object.entries(destinations).map(([key, dest]) => (
        <Float key={key} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
          <mesh 
            position={dest.position} 
            onClick={() => destination.setActive(key)}
            scale={key === destination.active ? 1.5 : 1}
          >
            <sphereGeometry args={[0.8, 32, 32]} />
            <MeshDistortMaterial 
              color={dest.color} 
              attach="material" 
              distort={0.3}
              speed={2}
              roughness={0.1}
            />
          </mesh>
          <Text
            position={[dest.position[0], dest.position[1] - 1.5, dest.position[2]]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {dest.name}
          </Text>
        </Float>
      ))}
    </group>
  );
}

export default function DestinationsPage() {
  const [activeDestination, setActiveDestination] = useState('paris');
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
          <p className="text-white text-lg">Loading 3D Destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <DestinationGlobe destination={{ active: activeDestination, setActive: setActiveDestination }} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Environment preset="night" />
          <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Destinations</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the world through our immersive 3D navigation system. Select a destination to explore.
          </p>
        </motion.div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Paris, France</h3>
            <p className="text-gray-300 mb-4">
              The City of Light awaits with its iconic landmarks, romantic ambiance, and world-class cuisine.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Eiffel Tower & Louvre Museum</li>
              <li>• Seine River Cruise</li>
              <li>• Montmartre & Sacré-Cœur</li>
              <li>• Starting from $1,499</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-green-400">Bali, Indonesia</h3>
            <p className="text-gray-300 mb-4">
              Tropical paradise with stunning beaches, lush rice terraces, and vibrant culture.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Ubud Rice Terraces</li>
              <li>• Tanah Lot Temple</li>
              <li>• Seminyak Beaches</li>
              <li>• Starting from $999</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Santorini, Greece</h3>
            <p className="text-gray-300 mb-4">
              Breathtaking island with white-washed buildings, blue domes, and stunning sunsets.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Oia Sunset Views</li>
              <li>• Red Beach</li>
              <li>• Akrotiri Archaeological Site</li>
              <li>• Starting from $1,299</li>
            </ul>
          </motion.div>
        </div>

        {/* Interactive Map Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center">Interactive 3D Map</h2>
          <p className="text-center text-gray-300 mb-8">
            Click on any destination sphere to learn more about that location
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                {activeDestination === 'paris' && 'Paris, France'}
                {activeDestination === 'tokyo' && 'Tokyo, Japan'}
                {activeDestination === 'bali' && 'Bali, Indonesia'}
                {activeDestination === 'santorini' && 'Santorini, Greece'}
                {activeDestination === 'newyork' && 'New York, USA'}
              </h3>
              
              <p className="text-gray-300">
                {activeDestination === 'paris' && 'The City of Light offers iconic landmarks like the Eiffel Tower, Louvre Museum, and charming cafes. Experience romance and culture in one of the world\'s most beautiful cities.'}
                {activeDestination === 'tokyo' && 'A vibrant metropolis where ancient traditions meet cutting-edge technology. From serene temples to bustling neon districts, Tokyo offers an unforgettable experience.'}
                {activeDestination === 'bali' && 'A tropical paradise with stunning beaches, lush rice terraces, and vibrant culture. Perfect for relaxation, adventure, and spiritual renewal.'}
                {activeDestination === 'santorini' && 'Famous for its white-washed buildings, blue domes, and breathtaking sunsets. This Greek island offers romance and beauty in every corner.'}
                {activeDestination === 'newyork' && 'The city that never sleeps, offering world-class entertainment, iconic landmarks, diverse culture, and endless opportunities for exploration.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Best Time to Visit</h4>
                  <p className="text-gray-300">
                    {activeDestination === 'paris' && 'April-June, September-October'}
                    {activeDestination === 'tokyo' && 'March-May, September-November'}
                    {activeDestination === 'bali' && 'April-September'}
                    {activeDestination === 'santorini' && 'April-May, September-October'}
                    {activeDestination === 'newyork' && 'April-June, September-November'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Duration</h4>
                  <p className="text-gray-300">5-7 days recommended</p>
                </div>
              </div>
              
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Book This Destination
              </button>
            </div>
            
            <div className="h-80 bg-black/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl">
                    {activeDestination === 'paris' && '🗼'}
                    {activeDestination === 'tokyo' && '🗼'}
                    {activeDestination === 'bali' && '🏖️'}
                    {activeDestination === 'santorini' && '🏛️'}
                    {activeDestination === 'newyork' && '🏙️'}
                  </span>
                </div>
                <p className="text-gray-300">
                  Interactive 3D preview of {activeDestination === 'paris' && 'Paris'}
                  {activeDestination === 'tokyo' && 'Tokyo'}
                  {activeDestination === 'bali' && 'Bali'}
                  {activeDestination === 'santorini' && 'Santorini'}
                  {activeDestination === 'newyork' && 'New York'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}