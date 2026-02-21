import "./App.css";

export default function App() {
  return (
    <div className="page" id="top">
      <header className="header">
        <div className="nav">
          <a className="logo" href="#top">Pratik Patel</a>
          <nav className="links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="pill">Open to Co-op / Internship</div>

          <h1>
            Hi, I’m <span className="accent">Pratik Patel</span>
          </h1>

          <p className="sub">
            Computer Science student building clean, practical projects with React, APIs, and SQL — deployed so recruiters can click and review.
          </p>

          <div className="btnRow">
            <a className="btn primary" href="./resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
            <a className="btn" href="https://github.com/Pratik-Ptl" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn" href="https://www.linkedin.com/in/PratikK-Patel" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <section id="about" className="card">
          <h2>About</h2>
          <p>
            I’m a CS student focused on turning ideas into polished demos. Right now I’m improving my React skills, learning APIs,
            and building projects for co-op / internship applications.
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
            <article className="proj">
              <div className="projTop">
                <h3>Portfolio Website</h3>
                <div className="projLinks">
                  <a className="chipLink" href="#" target="_blank" rel="noreferrer">Live</a>
                  <a className="chipLink" href="#" target="_blank" rel="noreferrer">Code</a>
                </div>
              </div>
              <p>React + Vite portfolio deployed with GitHub Pages.</p>
              <div className="tags">
                <span>React</span>
                <span>Vite</span>
                <span>GitHub Pages</span>
              </div>
            </article>

            <article className="proj">
              <div className="projTop">
                <h3>SubTrack — Subscription Tracker</h3>
                <div className="projLinks">
                  <a
                    className="chipLink"
                    href="https://subscription-tracker-delta-virid.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    className="chipLink"
                    href="https://github.com/Pratik-Ptl/Subscription-Tracker"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            
              <p>
                Track subscriptions with due dates, monthly/yearly spend estimates, CSV export, guest mode,
                and cloud sync using Supabase authentication + database.
              </p>
            
              <div className="tags">
                <span>React</span>
                <span>Vite</span>
                <span>Tailwind</span>
                <span>Supabase</span>
                <span>Vercel</span>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="card">
          <h2>Contact</h2>
          <div className="contactRow">
            <a className="contactItem" href="mailto:pratik040105@gmail.com">pratik040105@gmail.com</a>
            <a className="contactItem" href="https://github.com/Pratik-Ptl" target="_blank" rel="noreferrer">
              github.com/Pratik-Ptl
            </a>
            <a className="contactItem" href="https://www.linkedin.com/in/PratikK-Patel" target="_blank" rel="noreferrer">
              linkedin.com/in/PratikK-Patel
            </a>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Pratik Patel</footer>
      </main>
    </div>
  );
}
