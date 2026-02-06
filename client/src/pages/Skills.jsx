import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaRobot,
  FaTools
} from "react-icons/fa";

const skillIcons = {
  "Frontend Development": FaReact,
  "Backend Development": FaNodeJs,
  "Database": FaDatabase,
  "GenAI": FaRobot,
  "Additional Skills": FaTools
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllSkills = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills/get`
      );
      setSkills(res.data.skills);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen text-white px-6 md:px-20">
      {/* Header */}
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Skills & <span className="red-static-text">Expertise</span>
        </h1>
        <p className="text-gray-400 md:text-2xl text-sm">
          Technologies and tools I work with on a daily basis
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
        {skills.map((item) => {
          const Icon = skillIcons[item.name] || FaTools;

          return (
            <div
              key={item._id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              {/* Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10">
                  <Icon className="text-red-500 text-xl" />
                </div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>
              </div>

              {/* Tech List */}
              <ul className="space-y-2">
                {item.tech.map((tech, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
