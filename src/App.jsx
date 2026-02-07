import "./App.css";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="nav">
          <div className="logo">Pratik Patel</div>
          <div className="links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="pill">Open to Co-op / Internship</div>
          <h1>
            Hi, I’m <span className="accent">Pratik Patel</span>
          </h1>
          <p className="sub">
            Computer Science student building clean, practical projects with React, APIs, and SQL — deployed so recruiters can
            click and see.
          </p>

          <div className="btnRow">
            <a className="btn primary" href="./resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
            <a className="btn" href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn" href="https://www.linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <section id="about" className="card">
          <h2>About</h2>
          <p>
            I’m a CS student focused on turning ideas into polished demos. Right now I’m improving my React skills, learning
            APIs, and building projects for co-op / internship applications.
          </p>
        </section>

        <section id="skills" className="card">
          <h2>Skills</h2>
          <div className="grid">
            <div>
              <h3>Languages</h3>
              <p>Python, C++, Java, JavaScript, PHP, SQL</p>
            </div>
            <div>
              <h3>Tools</h3>
              <p>Git/GitHub, VS Code, Linux, MySQL</p>
            </div>
            <div>
              <h3>Learning</h3>
              <p>React, REST APIs, deployment</p>
            </div>
          </div>
        </section>

        <section id="projects" className="card">
          <h2>Projects</h2>
          <div className="projGrid">
            <div className="proj">
              <h3>Portfolio Website</h3>
              <p>React + Vite portfolio deployed with GitHub Pages.</p>
              <div className="tags">
                <span>React</span>
                <span>Vite</span>
                <span>GitHub Pages</span>
              </div>
            </div>

            <div className="proj">
              <h3>Next Project</h3>
              <p>Job tracker / recipe app remake / study planner (coming soon).</p>
              <div className="tags">
                <span>Planned</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="card">
          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
          </p>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Pratik Patel</footer>
      </main>
    </div>
  );
}
