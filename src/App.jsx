import "./App.css";

const projects = [
  {
    title: "Portfolio Website",
    desc: "This website — built with React + Vite and deployed on GitHub Pages.",
    tags: ["React", "Vite", "GitHub Pages"],
    links: [{ label: "Live", href: "#" }, { label: "Code", href: "#" }],
  },
  {
    title: "Recipe Web App (Uni Project)",
    desc: "A simple recipe website with PHP + MySQL (improving it into a polished version next).",
    tags: ["PHP", "MySQL", "HTML/CSS"],
    links: [{ label: "Details", href: "#" }],
  },
  

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Card({ title, children, right }) {
  return (
    <section className="card">
      <div className="cardHead">
        <h2>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="nav">
          <a className="logo" href="#top">
            Pratik Patel
          </a>
          <nav className="links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="heroLeft">
            <Pill>Open to Co-op / Internship</Pill>
            <h1>
              Building <span className="accent">clean</span> web & software projects.
            </h1>
            <p className="sub">
              Computer Science student focused on React, APIs, and practical projects recruiters can click and review.
            </p>

            <div className="ctaRow">
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

            <div className="miniStats">
              <div className="stat">
                <div className="statNum">3+</div>
                <div className="statLabel">Projects</div>
              </div>
              <div className="stat">
                <div className="statNum">React</div>
                <div className="statLabel">Modern stack</div>
              </div>
              <div className="stat">
                <div className="statNum">SQL</div>
                <div className="statLabel">Data basics</div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="glass">
              <div className="glassTitle">Highlights</div>
              <ul className="bullets">
                <li>Strong fundamentals: C++, Python, problem solving</li>
                <li>Web: JavaScript, React, APIs, deployment</li>
                <li>Data: SQL/MySQL, basic ETL thinking</li>
              </ul>
              <div className="glassFooter">
                <span className="dot" /> Available for Summer / Fall roles
              </div>
            </div>
          </div>
        </section>

        <div className="grid2">
          <Card title="About" right={<a className="smallLink" href="#contact">Contact →</a>}>
            <p className="text">
              I’m a Computer Science student who enjoys building practical projects that are clean, fast, and easy to use.
              Right now I’m focused on React, APIs, and SQL — and I’m actively turning small ideas into polished, live demos.
            </p>
          </Card>

          <Card title="Skills">
            <div className="skills">
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
                <p>React patterns, REST APIs, deployments</p>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Projects">
          <div className="projects">
            {projects.map((p) => (
              <article className="project" key={p.title}>
                <div className="projectTop">
                  <h3>{p.title}</h3>
                  <div className="projectLinks">
                    {p.links.map((l) => (
                      <a key={l.label} className="chipLink" href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <p className="muted">{p.desc}</p>
                <div className="tagRow">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card title="Contact" right={<span className="pill subtle">Let’s talk</span>}>
          <div id="contact" className="contact">
            <a className="contactItem" href="mailto:pratik040105@gmail.com">pratik040105@gmail.com</a>
            <a className="contactItem" href="https://github.com/Pratik-Ptl" target="_blank" rel="noreferrer">
              github.com/Pratik-Ptl
            </a>
            <a className="contactItem" href="https://www.linkedin.com/in/PratikK-Patel" target="_blank" rel="noreferrer">
              linkedin.com/in/PratikK-Patel/
            </a>
          </div>
        </Card>

        <footer className="footer">© {new Date().getFullYear()} Pratik Patel</footer>
      </main>
    </div>
  );
}
