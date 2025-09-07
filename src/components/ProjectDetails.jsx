import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};

  // Check if project data exists, if not redirect to home
  React.useEffect(() => {
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200"
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft /> Back to Portfolio
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Project Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-blue-400 max-w-3xl mx-auto">
              {project.description}
            </p>
          </motion.div>

          {/* Project Image */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-lg overflow-hidden shadow-xl bg-gray-800 border border-gray-700"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-contain max-h-[500px] mx-auto"
            />
          </motion.div>

          {/* Project Info */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
              {/* Detailed Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.longDescription || "This project showcases the implementation of modern web development practices and technologies. It demonstrates the ability to create scalable and maintainable solutions while providing an excellent user experience."}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Key Features</h2>
                <ul className="text-gray-300 space-y-3">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Responsive design for all device sizes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Intuitive user interface and smooth interactions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Optimized performance and loading times</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>Secure and scalable architecture</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Technologies Used */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Project Links</h2>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors duration-200 w-full"
                >
                  <FaGithub /> View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 w-full"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>

              {/* Project Details */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>Web Application</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;