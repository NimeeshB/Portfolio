import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper bg-[#FFEFDB] flex overflow-hidden items-center justify-center rounded-xl p-6 h-[500px]">
              <img src="/images/Callmind.png" alt="Ryde App Interface" className="max-h-full max-w-full object-contain rounded-lg"/>
            </div>
            <div className="text-content">
              <h2>
                CallMind: AI-Powered Video Conferencing Platform with Real-Time Collaboration
              </h2>
              <p className="text-white-50 md:text-xl">
                 Built using Next.js 15, React 19, and Stream SDKs, featuring AI meeting summaries, real-time chat, and a scalable serverless architecture.
              </p>
              <a
    href="https://github.com/NimeeshB/SyncMind" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 mt-4
             text-sm font-semibold text-black bg-white rounded-lg
             shadow-md hover:bg-gray-200 transition-colors duration-300"
  >
    🔗 View on GitHub
  </a>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/blog.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>
    BlogSphere: Blogging Platform with Rich Editor and Social Features
  </h2>
  <p className="text-white-50 md:text-xl">
    Developed with React and Appwrite, enabling seamless content creation, likes, and user interactions in a responsive UI.
  </p>
  <a
    href="https://github.com/NimeeshB/BlogSphere-Frontend" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 mt-4
             text-sm font-semibold text-black bg-white rounded-lg
             shadow-md hover:bg-gray-200 transition-colors duration-300"
  >
    🔗 View on GitHub
  </a>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/creatorspace.png" alt="YC Directory App" />
              </div>
              <h2>
    CreatorSpace: Video Sharing Platform Optimized for Performance and Security
  </h2>
  <p className="text-white-50 md:text-xl">
    Built with Node.js, MongoDB, and JWT authentication, providing secure media handling and a scalable backend.
  </p>
  <a
    href="https://github.com/NimeeshB/CreatorSpace-Backend" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 mt-4
             text-sm font-semibold text-black bg-white rounded-lg
             shadow-md hover:bg-gray-200 transition-colors duration-300"
  >
    🔗 View on GitHub
  </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
