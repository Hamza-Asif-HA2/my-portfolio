import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};

  if (!project) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <FaArrowLeft /> Back to Portfolio
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Project Image */}
          <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-contain"
            />
          </div>

          {/* Project Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Detailed Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {project.longDescription || "This project showcases the implementation of modern web development practices and technologies. It demonstrates the ability to create scalable and maintainable solutions while providing an excellent user experience."}
              </p>
            </div>

            {/* Technologies Used */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                )) || (
                  <>
                    <li>Responsive design for all device sizes</li>
                    <li>Intuitive user interface and smooth interactions</li>
                    <li>Optimized performance and loading times</li>
                    <li>Secure and scalable architecture</li>
                  </>
                )}
              </ul>
            </div>

            {/* Project Links */}
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FaGithub /> View Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
