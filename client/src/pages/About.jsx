import CountUp from "@/CountUp";


export default function About({ scrollToContact }) {
  return (
    <section className="min-h-screen px-6 md:px-20 flex flex-col justify-start md:justify-center text-white relative z-10">
      <h2 className="text-center py-20 md:py-0 text-4xl md:text-6xl font-bold  md:mb-16">
        About <span className="red-static-text">Me</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-gray-400  text-base md:text-xl leading-relaxed">
            I am a B.Tech student in Information Technology with a strong interest in building real-world software solutions. I have hands-on experience developing frontend, backend, and full-stack applications, and I enjoy turning ideas into functional, user-friendly digital products.
            
            Currently, I am expanding my skills in Generative AI, learning how to integrate intelligent features into applications using modern AI tools and frameworks like LangChain.
            
            I’m passionate about continuous learning, solving challenging problems, and building applications that combine solid engineering with intelligent automation.
          </p>

          <button onClick={scrollToContact} className="horror-btn h-12 px-8 mt-10">
            Let’s Connect
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-5xl font-bold text-white"><CountUp from={0} to={6} separator="," direction="up" duration={3} className="count-up-text" startCounting={false}/>+</h3>
            <p className="text-gray-400 mt-2 text-lg">Projects Completed</p>
          </div>

          <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-5xl font-bold text-white"><CountUp from={0} to={350} separator="," direction="up" duration={3} className="count-up-text" startCounting={false}/>+</h3>
            <p className="text-gray-400 mt-2 text-lg">DSA Questions Solved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
