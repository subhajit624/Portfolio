export default function Home({ scrollToProjects, scrollToContact }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3"> Hello, I'm </h1>

      <h1 className="horror-text text-3xl sm:text-5xl md:text-6xl mb-4"> Subhajit Ghosh</h1>

      <p className="text-gray-400 text-base sm:text-lg md:text-2xl mb-10 pt-1"> Full Stack Developer building AI-powered applications </p>

      <div className="flex flex-col sm:flex-row gap-6 pt-4">
        <button onClick={scrollToProjects} className="horror-btn h-12 px-8 flex items-center justify-center">
          View My Work →
        </button>
        <button onClick={scrollToContact} className="h-12 px-8 cursor-pointer flex items-center justify-center backdrop-blur-md bg-white/10 text-white border border-white/30 rounded-full hover:bg-white/20 transition">
          Get In Touch
        </button>
      </div>
    </section>
  );
}
