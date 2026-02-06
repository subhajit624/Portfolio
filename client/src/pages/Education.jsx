import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  const itemRefs = useRef([]);

  const handleEducation = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/education/get`
      );
      setEducation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCertificates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/certificates/get`
      );
      setCertificates(res.data.certificates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEducation();
    handleCertificates();
  }, []);

  useEffect(() => {
    if (!education.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.35 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [education]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen text-white px-6 md:px-20">
      {/* ================= EDUCATION ================= */}
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl red-static-text font-bold mb-4">
          Education
        </h1>
        <p className="text-gray-400 md:text-xl text-sm">
          My academic background and professional certifications
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div
          className="absolute left-1/2 top-0 w-[2px] bg-red-500 origin-top transition-all duration-700"
          style={{
            height: `${(visibleItems.length / education.length) * 100}%`,
            transform: "translateX(-50%)"
          }}
        />

        <div className="space-y-20">
          {education.map((item, index) => {
            const isVisible = visibleItems.includes(index.toString());
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item._id}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index.toString()}
                className="relative grid grid-cols-1 md:grid-cols-2 items-start"
              >
                <div className={isLeft ? "md:pr-12" : "md:col-start-1"}>
                  {isLeft && (
                    <TimelineCard item={item} isVisible={isVisible} align="left" />
                  )}
                </div>

                <div className={!isLeft ? "md:pl-12 md:col-start-2" : "md:col-start-2"}>
                  {!isLeft && (
                    <TimelineCard item={item} isVisible={isVisible} align="right" />
                  )}
                </div>

                <div
                  className={`absolute left-1/2 top-4 w-4 h-4 bg-red-400 rounded-full transform -translate-x-1/2 transition-all duration-500
                    ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= CERTIFICATES ================= */}
      <div className="text-center py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Certificates & <span className="red-static-text">Achievements</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
        {certificates.map((item) => (
          <div
            key={item._id}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
          >
            {/* Image (only if exists) */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-xl font-semibold mb-2">
              {item.name}
            </h3>

            {item.description && (
              <p className="text-gray-400 mb-3">
                {item.description}
              </p>
            )}

            {(item.issuedBy || item.issueDate) && (
              <p className="text-sm text-gray-400 mb-4">
                {item.issuedBy && <span>{item.issuedBy}</span>}
                {item.issuedBy && item.issueDate && " · "}
                {item.issueDate && <span>{item.issueDate}</span>}
              </p>
            )}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block cursor-pointer text-sm red-static-text hover:underline"
              >
                View Pofile →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineCard({ item, isVisible, align }) {
  return (
    <div
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 max-w-xl
        transform transition-all duration-700 ease-out
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : align === "right"
            ? "opacity-0 translate-x-10"
            : "opacity-0 -translate-x-10"
        }
      `}
    >
      <p className="text-sm red-flow-text mb-2 text-right">
        {item.startYear} – {item.endYear}
      </p>

      <h2 className="text-2xl font-semibold mb-1">
        {item.degree}
        {item.fieldOfStudy && (
          <span className="text-gray-400 text-xl"> · {item.fieldOfStudy}</span>
        )}
      </h2>

      <p className="text-xl mb-1 red-static-text">
        {item.institution}
        <span className="text-gray-400 text-lg"> · {item.location}</span>
      </p>

      {(item.gpa || item.percentage) && (
        <p className="text-sm text-gray-400 mt-2">
          {item.gpa && `GPA: ${item.gpa}`}
          {item.gpa && item.percentage && " | "}
          {item.percentage && `Percentage: ${item.percentage}`}
        </p>
      )}
    </div>
  );
}
