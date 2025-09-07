import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaExternalLinkAlt,
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDownload,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs, SiFirebase } from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import trendyImage from './assets/trendy-ecommerce.png';
import assignmentImage from './assets/getyourassignment.png';
import me from "./assets/me.png";

const Portfolio = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    // Check user's preference from localStorage or system preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Portfolio data - Easy to manage and update
  const portfolioData = useMemo(() => ({
    personal: {
      name: "Hamza Asif",
      title: "Full Stack MERN Developer",
      email: "hamzaasif0726@gmail.com",
      location: "Lahore, Pakistan",
      bio: "Passionate full-stack developer with expertise in the MERN stack. I focus on creating efficient, scalable, and user-friendly web applications. Committed to writing clean code and implementing modern development practices.",
      resume: "#",
      avatar: me
    },
    
    skills: [
      { name: "React.js", icon: FaReact, color: "text-blue-400" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      { name: "Framer Motion", icon: TbBrandFramerMotion, color: "text-pink-500" }
    ],

    projects: [
      {
        id: 1,
        title: "Trendy Ecommerce Website",
        description: "A modern e-commerce platform built with React.js and Firebase, offering a seamless shopping experience with real-time updates and secure authentication.",
        technologies: ["React.js", "Firebase", "Tailwind CSS", "React Router", "Context API"],
        image: trendyImage,
        github: "https://github.com/Hamza-Asif-HA2/Trendy-Ecommerce-Web-App",
        live: "https://trendy-ecommerce.vercel.app/",
        featured: true,
        features: [
          "Firebase Authentication for secure user management",
          "Real-time product inventory updates with Firebase",
          "Responsive design using Tailwind CSS",
          "Shopping cart with persistent storage",
          "Dynamic product filtering and search",
          "Clean and intuitive user interface",
          "State management with Context API"
        ],
        longDescription: "Trendy Ecommerce is a full-featured online shopping platform that combines modern design with powerful functionality. Built using React.js for the frontend and Firebase for backend services, it provides a robust and scalable solution for online retail. The use of Tailwind CSS ensures a consistent and responsive design across all devices, while Firebase's real-time database capabilities enable instant updates to product inventory and user cart data. The platform features secure user authentication, an intuitive shopping experience, and efficient state management using React's Context API.",
        date: "2024",
        category: "E-commerce Web App"
      },
      {
        id: 2,
        title: "AI Assignment Generator",
        description: "An innovative educational tool powered by Google's Gemini AI API that helps students and educators generate customized assignments and learning materials.",
        technologies: ["React.js", "Firebase", "Gemini AI API", "Tailwind CSS", "React Router"],
        image: assignmentImage,
        github: "https://github.com/Hamza-Asif-HA2/aiassignment",
        live: "https://getyourassignment.online/",
        featured: true,
        features: [
          "Integration with Google's Gemini AI for intelligent content generation",
          "Firebase Authentication and Database for user data management",
          "Customizable assignment templates and parameters",
          "Real-time assignment generation and updates",
          "Responsive and intuitive user interface with Tailwind CSS",
          "Support for multiple academic subjects and formats",
          "Secure data storage and retrieval with Firebase"
        ],
        longDescription: "The AI Assignment Generator is a cutting-edge educational platform that harnesses the power of Google's Gemini AI API to revolutionize assignment creation. Built with React.js and styled with Tailwind CSS, the platform offers a modern and intuitive interface for both students and educators. Firebase integration ensures secure user authentication and reliable data storage, while the Gemini AI API enables intelligent, context-aware content generation. Users can create customized assignments across various subjects, with real-time generation and updates. The platform's responsive design and efficient state management make it accessible and user-friendly across all devices.",
        date: "2024",
        category: "Educational Web App"
      }
    ],

    services: [
      {
        title: "Frontend Development",
        description: "Creating responsive and interactive user interfaces with React.js, Tailwind CSS, and modern JavaScript.",
        icon: FaCode
      },
      {
        title: "Backend Development",
        description: "Building robust server-side applications with Node.js, Express, and database management.",
        icon: FaServer
      },
      {
        title: "Full-Stack Solutions",
        description: "End-to-end web application development using the MERN stack and related technologies.",
        icon: FaDatabase
      }
    ],

    social: [
      { name: "GitHub", icon: FaGithub, url: "https://github.com/Hamza-Asif-HA2" },
      { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/hamza-asif-6a550321a/" },
      { name: "Email", icon: FaEnvelope, url: "mailto:hamzaasif0726@gmail.com" }
    ]
  }), []);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => nav.id);
      const scrollPosition = window.scrollY + 100;
      
      // Set scrolled state for navbar styling
      setScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? (darkMode ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-md') 
          : (darkMode ? 'bg-transparent' : 'bg-transparent')
      } border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold cursor-pointer"
              onClick={scrollToTop}
            >
              {portfolioData.personal.name}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 hover:text-blue-400 relative ${
                    activeSection === item.id ? 'text-blue-400' : ''
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                      layoutId="activeSection"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden fixed top-16 left-0 right-0 border-t ${
                darkMode ? 'border-gray-800 bg-gray-900/95 backdrop-blur-md' : 'border-gray-200 bg-white/95 backdrop-blur-md'
              } shadow-lg z-50`}
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-400/10'
                        : darkMode 
                          ? 'hover:bg-gray-800/80' 
                          : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500 mb-8">
              <img 
                src={portfolioData.personal.avatar} 
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <span className="text-blue-500">{portfolioData.personal.name}</span>
            </motion.h1>
            <motion.h2 
              className="text-xl md:text-2xl text-blue-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {portfolioData.personal.title}
            </motion.h2>
            <motion.p 
              className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {portfolioData.personal.bio}
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {portfolioData.social.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label={social.name}
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
            >
              View My Work
              <FaChevronDown className="ml-2" />
            </button>
            <a
              href={portfolioData.personal.resume}
              download
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
            >
              Download CV
              <FaDownload className="ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Full Stack Developer</h3>
              <p className="text-lg mb-6 leading-relaxed">
                I specialize in modern web development using the MERN stack, crafting responsive 
                and intuitive user interfaces with React.js while building robust backend solutions 
                with Node.js and Express. My focus is on writing clean, maintainable code and 
                implementing best practices in software development.
              </p>
              <p className="text-lg mb-8 leading-relaxed">
                Beyond coding, I'm dedicated to continuous learning and staying current with emerging 
                technologies. I enjoy tackling complex problems, optimizing application performance, 
                and collaborating with teams to deliver exceptional web solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={portfolioData.personal.resume}
                  download
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <FaDownload className="mr-2" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <FaEnvelope className="mr-2" />
                  Contact Me
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {portfolioData.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg text-center ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow duration-200 group`}
                >
                  <service.icon className="text-3xl text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h4 className="font-semibold mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 aspect-square rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                } hover:shadow-lg transition-all duration-200 group flex flex-col items-center justify-center`}
              >
                <skill.icon className={`text-4xl mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-200`} />
                <h3 className="font-semibold text-center">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } group`}
              >
                <div className="relative overflow-hidden h-[300px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain bg-gray-900 p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                      onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                    >
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt />
                      <span>{project.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                      <FaGithub /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                    <button
                      onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
            >
              <FaEnvelope className="mr-2" />
              Say Hello
            </a>
            <p className="mt-6 text-gray-400">
              Or find me on social media
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {portfolioData.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label={social.name}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrolled ? 1 : 0, 
          scale: scrolled ? 1 : 0 
        }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-40 ${
          darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors duration-200`}
        aria-label="Scroll to top"
      >
        <FaChevronDown className="rotate-180" />
      </motion.button>
    </div>
  );
};

export default Portfolio;