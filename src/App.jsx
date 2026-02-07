import "./App.css";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="nav">
          <a className="logo" href="#top">Pratik Patel</a>
          <div className="links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <h1>
            Hi, I’m <span className="accent">Pratik Patel</span>
          </h1>
          <p className="subtitle">Computer Science student | Seeking Co-op / Internship</p>
          <p className="desc">
            I’m building modern web and software skills and I like shipping clean, practical projects.
          </p>

          <div className="buttons">
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
            Write 4–6 lines about what you’re studying, what roles you want, and what you’re learning right now.
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
              <h3>Currently learning</h3>
              <p>React, APIs, deployment</p>
            </div>
          </div>
        </section>

        <section id="projects" className="card">
          <h2>Projects</h2>
          <div className="projects">
            <div className="project">
              <h3>Portfolio Website</h3>
              <p>This website — built with React + Vite and deployed on GitHub Pages.</p>
              <div className="tags">
                <span>React</span><span>Vite</span><span>GitHub Pages</span>
              </div>
            </div>

            <div className="project">
              <h3>Next project (coming soon)</h3>
              <p>Job Application Tracker / Recipe app / Study planner</p>
              <div className="tags">
                <span>Planned</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="card">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a></p>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Pratik Patel</footer>
      </main>
    </>
  );
}
