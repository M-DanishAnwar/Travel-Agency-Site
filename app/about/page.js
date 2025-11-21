'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Team Globe Component
function TeamGlobe() {
  const teamPositions = [
    { position: [2, 1, 0], color: "#3b82f6" },
    { position: [-1, 2, 1], color: "#8b5cf6" },
    { position: [0, -2, -2], color: "#10b981" },
    { position: [-2, 0, 2], color: "#f59e0b" },
    { position: [1, -1, -1], color: "#ec4899" },
  ];

  return (
    <group>
      {teamPositions.map((pos, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
          <mesh position={pos.position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
              color={pos.color} 
              emissive={pos.color}
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Central Earth */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            wireframe={true}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
          <TeamGlobe />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
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
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Voyage3D</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Revolutionizing travel with immersive 3D experiences and advanced navigation technology
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto leading-relaxed">
            At Voyage3D, we believe travel should be an immersive, interactive experience from the moment you start planning. 
            Our cutting-edge 3D navigation technology transforms how you discover, explore, and book your next adventure. 
            We're committed to making travel planning more engaging, intuitive, and visually stunning than ever before.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Team</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "CEO & Founder", bio: "Visionary leader with 15+ years in travel tech" },
              { name: "Maria Chen", role: "CTO", bio: "Expert in 3D visualization and immersive technologies" },
              { name: "David Wilson", role: "Creative Director", bio: "Award-winning designer specializing in UX/UI" },
              { name: "Sarah Kim", role: "Head of Innovation", bio: "Pioneer in AR/VR travel experiences" }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Technology</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "3D Navigation", 
                description: "Interactive 3D maps and destination previews",
                icon: "🌍"
              },
              { 
                title: "Real-time Rendering", 
                description: "High-performance 3D graphics using WebGL",
                icon: "✨"
              },
              { 
                title: "AR Integration", 
                description: "Augmented reality features for immersive planning",
                icon: "👓"
              },
              { 
                title: "AI Recommendations", 
                description: "Smart travel suggestions based on preferences",
                icon: "🤖"
              },
              { 
                title: "Cloud Infrastructure", 
                description: "Scalable deployment on modern cloud platforms",
                icon: "☁️"
              },
              { 
                title: "Cross Platform", 
                description: "Works seamlessly on all devices and browsers",
                icon: "📱"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="p-4 bg-black/20 rounded-lg border border-white/10"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-bold mb-2">{tech.title}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Travel Experience?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the world through our innovative 3D platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
              Start Exploring
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}