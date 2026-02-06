import axios from "axios";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowUpRight
} from "lucide-react";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  Email: Mail
};

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/get`
      );
      setContacts(res.data.contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

  const emailContact = contacts.find((c) => c.appname === "Email");

  return (
    <section className="min-h-screen px-6 md:px-20 py-24 text-white">
      {/* HEADING */}
      <div className="text-center mb-14">
        <h2 className="md:text-6xl text-4xl font-bold mb-4">
          Let's Work{" "}
          <span className="red-static-text">Together</span>
        </h2>
        <p className="md:text-xl text-sm text-gray-400">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
      </div>

      {/* OUTER GLASS CONTAINER WITH SIDE GLOW */}
      <div
        className="
          relative
          mx-auto
          max-w-5xl
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-8
          md:p-12
          shadow-[0_0_40px_rgba(255,0,0,0.15)]
        "
      >
        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.appname];

            return (
              <a
                key={contact._id}
                href={contact.link}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  px-6
                  py-5
                  hover:border-red-500/40
                  transition-all
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="
                      p-3
                      rounded-full
                      bg-red-500/10
                      text-red-500
                      group-hover:bg-red-500
                      group-hover:text-white
                      transition
                    "
                  >
                    {Icon && <Icon size={22} />}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-lg">
                      {contact.appname}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      @{contact.username}
                    </p>
                  </div>
                </div>

                {/* ARROW */}
                <ArrowUpRight
                  size={20}
                  className="text-gray-400 group-hover:text-red-500 transition"
                />
              </a>
            );
          })}
        </div>

        {/* SEPARATOR LINE */}
        <div className="my-10 flex items-center gap-4">
          <span className="flex-1 h-px bg-white/10"></span>
          <span className="text-xs uppercase tracking-widest text-gray-500">
            Or
          </span>
          <span className="flex-1 h-px bg-white/10"></span>
        </div>

        {/* EMAIL FOOTER (MOBILE SAFE) */}
        {emailContact && (
          <div className="text-center px-2">
            <p className="text-gray-400 mb-2">
              Send me an email directly at
            </p>
            <a
              href={emailContact.link}
              className="
                text-red-500
                text-base
                md:text-lg
                font-semibold
                hover:underline
                block
                max-w-full
                truncate
                text-center
              "
              >
              {emailContact.username}
        </a>
          </div>
        )}
      </div>
    </section>
  );
}
