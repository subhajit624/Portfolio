import { useState } from "react";

export default function Navbar({ scrollTo, refs }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navItem =
    "relative cursor-pointer text-gray-300 hover:text-white transition";

  const navItems = [
    { label: "Home", ref: refs.homeRef },
    { label: "About", ref: refs.aboutRef },
    { label: "Education", ref: refs.eduRef },
    { label: "Skills", ref: refs.skillsRef },
    { label: "Projects", ref: refs.projectRef },
    { label: "Contact", ref: refs.contactRef }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="backdrop-blur-lg bg-black/40 border border-white/10 rounded-2xl px-6 py-4 shadow-lg flex items-center justify-between">
        {/* LEFT LOGO */}
        <div
          className="cursor-pointer text-2xl font-semibold"
          onClick={() => {
            scrollTo(refs.homeRef);
            setActive("Home");
          }}
        >
          <span className="text-white">Port</span>
          <span className="red-static-text">folio</span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-10 pr-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`${navItem}`}
              onClick={() => {
                scrollTo(item.ref);
                setActive(item.label);
              }}
            >
              {item.label}

              {/* UNDERLINE */}
              <span
                className={`
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  w-full
                  bg-red-500
                  transform
                  origin-left
                  transition-transform
                  duration-300
                  ${
                    active === item.label
                      ? "scale-x-100"
                      : "scale-x-0"
                  }
                `}
              />
            </button>
          ))}
        </div>

        {/* HAMBURGER */}
        <div
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white transition duration-300 ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-white transition duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-2 backdrop-blur-lg bg-black/50 border border-white/10 rounded-2xl py-6 flex flex-col items-center gap-6 text-gray-300 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                scrollTo(item.ref);
                setActive(item.label);
                setOpen(false);
              }}
              className={navItem}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
