import axios from "axios";
import { useEffect, useState } from "react";
import { ExternalLink, Github, GithubIcon } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const getAllProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/get`
      );
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen text-white px-6 md:px-20 py-20">
      <div className="text-center mb-16">
        <h2 className="md:text-6xl text-4xl font-bold mb-4 red-static-text">
          Projects
        </h2>
        <p className="md:text-xl text-sm text-gray-400">
          Some of my recent works and old projects
        </p>
      </div>

      <div className="grid
    grid-cols-1
    md:grid-cols-2
    gap-y-10
    gap-x-15
    max-w-md
    md:max-w-3xl
    lg:max-w-6xl
    mx-auto">
        {projects.map((project) => {
          const isExpanded = expandedId === project._id;

          return (
            <div
              key={project._id}
              className="rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-all"
            >
              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />

                {/* ICONS */}
                <div className="absolute bottom-4 right-4 flex gap-3">
                  {project.deployedLink && (
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-black/60 hover:bg-red-600 transition"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.gitLink && (
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-black/60 hover:bg-red-600 transition"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-2xl font-bold red-flow-text mb-3">
                  {project.title}
                </h3>

                <p
                  onClick={() =>
                    setExpandedId(isExpanded ? null : project._id)
                  }
                  className={`text-gray-300 text-sm cursor-pointer transition-all ${
                    isExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  {project.description}
                </p>

                <span
                  onClick={() =>
                    setExpandedId(isExpanded ? null : project._id)
                  }
                  className="text-xs text-red-400 cursor-pointer mt-2 inline-block"
                >
                  {isExpanded ? "Show less " : "Read more "}
                </span>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
