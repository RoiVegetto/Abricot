import { WorkspaceHeader } from "@/components/layout/workspace-header";
import { WorkspaceFooter } from "@/components/layout/workspace-footer";
import "./projects.css";

type ProjectCard = {
  id: number;
  title: string;
  description: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  members: string[];
  role: "Propriétaire" | "Contributeur";
};

const PROJECTS: ProjectCard[] = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  title: "Nom du projet",
  description: "Développement de la nouvelle version de l'API REST avec authentification JWT",
  progress: 0,
  completedTasks: 0,
  totalTasks: 12,
  members: ["AD", "BC", "CV"],
  role: "Propriétaire",
}));

export default function Projects() {
  return (
    <main className="projects-page">
      <WorkspaceHeader activeTab="projects" />

      <section className="projects-content">
        <header className="projects-header-row">
          <div>
            <h1>Mes projets</h1>
            <p>Gérez vos projets</p>
          </div>

          <button type="button" className="projects-create-btn">
            + Créer un projet
          </button>
        </header>

        <section className="projects-grid" aria-label="Liste des projets">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project-card">
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>

              <div className="project-progress-row">
                <span>Progression</span>
                <strong>{project.progress}%</strong>
              </div>

              <div className="project-progress-track" aria-hidden="true">
                <div className="project-progress-fill" style={{ width: `${project.progress}%` }} />
              </div>

              <p className="project-tasks-count">
                {project.completedTasks}/{project.totalTasks} tâches terminées
              </p>

              <div className="project-meta-row">
                <p>👥 Équipe ({project.members.length})</p>

                <div className="project-tags">
                  {project.members.map((member) => (
                    <span key={member} className="member-pill">
                      {member}
                    </span>
                  ))}
                  <span className="role-pill">{project.role}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>

      <WorkspaceFooter />
    </main>
  );
}
