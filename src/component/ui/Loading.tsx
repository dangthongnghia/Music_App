// import React, { useState, useEffect, useRef } from 'react'

// interface LoadingScreenProps {
//   onLoadingComplete?: () => void
//   appName?: string
// }

// interface Particle {
//   id: number
//   x: number
//   y: number
//   size: number
//   speed: number
//   opacity: number
//   color: string
// }

// const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete, appName = 'DangNghiaMusic' }) => {
//   const [isAnimating, setIsAnimating] = useState<boolean>(true)
//   const [loadingProgress, setLoadingProgress] = useState<number>(0)
//   const [currentStep, setCurrentStep] = useState<string>('Khởi tạo...')
//   const [showElements, setShowElements] = useState<boolean>(false)
//   const [particles, setParticles] = useState<Particle[]>([])
//   const logoRef = useRef<HTMLHeadingElement>(null)

//   // Các bước loading
//   const loadingSteps = [
//     { step: 'Khởi tạo...', duration: 500 },
//     { step: 'Đang tải tài nguyên...', duration: 800 },
//     { step: 'Kết nối server...', duration: 600 },
//     { step: 'Chuẩn bị giao diện...', duration: 700 },
//     { step: 'Hoàn tất!', duration: 400 }
//   ]

//   // Generate particles
//   useEffect(() => {
//     const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 2 + 1,
//       speed: Math.random() * 1.5 + 0.5,
//       opacity: Math.random() * 0.4 + 0.1,
//       color: ['#e50914', '#ff6b6b', '#ffffff'][Math.floor(Math.random() * 3)]
//     }))
//     setParticles(newParticles)
//   }, [])

//   // Simulate loading process
//   useEffect(() => {
//     let currentProgress = 0
//     let stepIndex = 0

//     const timer = setTimeout(() => setShowElements(true), 1000)

//     const loadingInterval = setInterval(() => {
//       currentProgress += Math.random() * 8 + 2

//       if (currentProgress >= 100) {
//         currentProgress = 100
//         setLoadingProgress(100)
//         setCurrentStep('Hoàn tất!')

//         setTimeout(() => {
//           setIsAnimating(false)
//           if (onLoadingComplete) {
//             setTimeout(onLoadingComplete, 800)
//           }
//         }, 500)

//         clearInterval(loadingInterval)
//       } else {
//         setLoadingProgress(currentProgress)

//         // Update loading step based on progress
//         const newStepIndex = Math.floor((currentProgress / 100) * loadingSteps.length)
//         if (newStepIndex !== stepIndex && newStepIndex < loadingSteps.length) {
//           stepIndex = newStepIndex
//           setCurrentStep(loadingSteps[stepIndex].step)
//         }
//       }
//     }, 150)

//     return () => {
//       clearTimeout(timer)
//       clearInterval(loadingInterval)
//     }
//   }, [onLoadingComplete])

//   const playLoadingSound = () => {
//     console.log('🎵 Loading sound!')
//   }

//   useEffect(() => {
//     const timer = setTimeout(playLoadingSound, 500)
//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <div
//       className={`fixed inset-0 z-100 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center items-center overflow-hidden transition-opacity duration-1000 ${
//         isAnimating ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       {/* Animated particles background */}
//       <div className='absolute inset-0 overflow-hidden'>
//         {particles.map((particle) => (
//           <div
//             key={particle.id}
//             className='absolute rounded-full'
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               backgroundColor: particle.color,
//               opacity: particle.opacity,
//               animation: `floatParticle ${5 + particle.speed}s ease-in-out infinite ${particle.id * 0.1}s`,
//               boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
//             }}
//           />
//         ))}
//       </div>

//       {/* Dynamic grid background */}
//       <div
//         className='absolute inset-0 opacity-5'
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(229, 9, 20, 0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(229, 9, 20, 0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '40px 40px',
//           animation: 'gridPulse 3s ease-in-out infinite'
//         }}
//       />

//       {/* Logo Section */}
//       <div className='relative mb-12' style={{ transformStyle: 'preserve-3d' }}>
//         {/* Logo shadow layers */}
//         {[...Array(3)].map((_, i) => (
//           <h1
//             key={i}
//             className='absolute text-6xl md:text-4xl sm:text-3xl font-black tracking-[-3px] uppercase origin-center'
//             style={{
//               transform: `translateZ(${-i * 5}px)`,
//               color: `rgba(229, 9, 20, ${0.6 - i * 0.2})`,
//               filter: `blur(${i * 1}px)`,
//               animation: `logoEntrance 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${i * 0.1}s`
//             }}
//           >
//             {appName}
//           </h1>
//         ))}

//         {/* Main logo */}
//         <h1
//           ref={logoRef}
//           className='relative text-6xl md:text-4xl sm:text-3xl font-black tracking-[-3px] uppercase origin-center'
//           style={{
//             background: 'linear-gradient(45deg, #e50914, #ff6b6b, #ffd700, #ff6b6b, #e50914)',
//             backgroundSize: '300% 300%',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             filter: 'drop-shadow(0 0 20px rgba(229, 9, 20, 0.6))',
//             animation:
//               'logoEntrance 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, gradientShift 3s ease-in-out infinite'
//           }}
//         >
//           {appName}
//         </h1>
//       </div>

//       {/* Loading Progress Section */}
//       <div
//         className={`w-80 max-w-[90%] transition-all duration-1000 ease-out ${
//           showElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}
//       >
//         {/* Progress Bar Container */}
//         <div className='relative mb-6'>
//           <div className='w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner'>
//             <div
//               className='h-full bg-gradient-to-r from-[#e50914] via-[#ff6b6b] to-[#ffd700] rounded-full transition-all duration-300 ease-out relative'
//               style={{
//                 width: `${loadingProgress}%`,
//                 boxShadow: '0 0 10px rgba(229, 9, 20, 0.6)'
//               }}
//             >
//               <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse' />
//             </div>
//           </div>

//           {/* Progress percentage */}
//           <div className='absolute -top-8 right-0 text-white/80 text-sm font-mono'>{Math.round(loadingProgress)}%</div>
//         </div>

//         {/* Loading Step Text */}
//         <div className='text-center mb-8'>
//           <p
//             className='text-white text-lg font-light tracking-wide'
//             style={{
//               textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
//               animation: showElements ? 'fadeInText 0.5s ease-in-out' : 'none'
//             }}
//           >
//             {currentStep}
//           </p>
//         </div>

//         {/* Loading Animation Bars */}
//         <div className='flex justify-center items-end gap-1 mb-8'>
//           {[...Array(5)].map((_, index) => (
//             <div
//               key={index}
//               className='bg-gradient-to-t from-[#e50914] via-[#ff6b6b] to-[#ffd700] origin-bottom rounded-t-sm'
//               style={{
//                 width: '3px',
//                 height: `${15 + (index % 3) * 5}px`,
//                 boxShadow: '0 0 8px rgba(229, 9, 20, 0.6)',
//                 animation: showElements
//                   ? `loadingSoundWave ${0.8 + (index % 3) * 0.2}s ease-in-out infinite ${index * 0.1}s`
//                   : 'none'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Bottom Loading Spinner */}
//       {showElements && (
//         <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2'>
//           <div className='relative'>
//             <div className='w-8 h-8 border-2 border-white/20 border-t-red-500 rounded-full animate-spin' />
//             <div
//               className='absolute inset-1 border border-red-500/30 border-t-white rounded-full animate-spin'
//               style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Custom Animations */}
//       <style>{`
//         @keyframes logoEntrance {
//           0% {
//             transform: scale(0.5) rotateY(-90deg);
//             opacity: 0;
//             letter-spacing: -10px;
//           }
//           50% {
//             transform: scale(1.1) rotateY(0deg);
//             opacity: 0.8;
//             letter-spacing: -3px;
//           }
//           100% {
//             transform: scale(1) rotateY(0deg);
//             opacity: 1;
//             letter-spacing: -3px;
//           }
//         }

//         @keyframes gradientShift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }

//         @keyframes loadingSoundWave {
//           0%, 100% {
//             transform: scaleY(0.4);
//             opacity: 0.7;
//           }
//           50% {
//             transform: scaleY(1.2);
//             opacity: 1;
//           }
//         }

//         @keyframes floatParticle {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px) rotate(0deg);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-15px) translateX(8px) rotate(180deg);
//             opacity: 0.8;
//           }
//         }

//         @keyframes gridPulse {
//           0%, 100% { opacity: 0.03; }
//           50% { opacity: 0.08; }
//         }

//         @keyframes fadeInText {
//           0% {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default LoadingScreen
