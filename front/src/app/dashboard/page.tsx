"use client";

import { useMemo, useState } from "react";
import { WorkspaceHeader } from "@/components/layout/workspace-header";
import { WorkspaceFooter } from "@/components/layout/workspace-footer";
import "./dashboard.css";

type DashboardView = "list" | "kanban";

type Task = {
  id: number;
  title: string;
  description: string;
  projectName: string;
  dueText: string;
  commentsCount: number;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};

const TASKS: Task[] = [
  {
    id: 1,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "8 mars",
    commentsCount: 2,
    status: "TODO",
  },
  {
    id: 2,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "IN_PROGRESS",
  },
  {
    id: 3,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "8 mars",
    commentsCount: 2,
    status: "TODO",
  },
  {
    id: 4,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "8 mars",
    commentsCount: 2,
    status: "TODO",
  },
  {
    id: 5,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "IN_PROGRESS",
  },
  {
    id: 6,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "DONE",
  },
  {
    id: 7,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "DONE",
  },
  {
    id: 8,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "DONE",
  },
  {
    id: 9,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "DONE",
  },
  {
    id: 10,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "IN_PROGRESS",
  },
  {
    id: 11,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "TODO",
  },
  {
    id: 12,
    title: "Nom de la tâche",
    description: "Description de la tâche",
    projectName: "Nom du projet",
    dueText: "9 mars",
    commentsCount: 2,
    status: "IN_PROGRESS",
  },
];

const STATUS_LABEL: Record<Task["status"], string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminée",
};

export default function Dashboard() {
  // Vue active du dashboard (liste ou kanban).
  const [view, setView] = useState<DashboardView>("list");

  // Découpe des tâches par colonne pour la vue kanban.
  const kanbanColumns = useMemo(
    () => ({
      TODO: TASKS.filter((task) => task.status === "TODO"),
      IN_PROGRESS: TASKS.filter((task) => task.status === "IN_PROGRESS"),
      DONE: TASKS.filter((task) => task.status === "DONE"),
    }),
    []
  );

  return (
    <main className="dashboard-page">
      <WorkspaceHeader activeTab="dashboard" />

      <section className="dashboard-content">
        <header className="dashboard-header-row">
          <div>
            <h1 className="dashboard-title">Tableau de bord</h1>
            <p className="dashboard-subtitle">
              Bonjour Alice Dupont, voici un aperçu de vos projets et tâches
            </p>
          </div>
          <button type="button" className="dashboard-create-btn">
            + Créer un projet
          </button>
        </header>

        <div className="dashboard-view-switch">
          <button
            type="button"
            className={`view-btn ${view === "list" ? "is-active" : ""}`}
            onClick={() => setView("list")}
          >
            Liste
          </button>
          <button
            type="button"
            className={`view-btn ${view === "kanban" ? "is-active" : ""}`}
            onClick={() => setView("kanban")}
          >
            Kanban
          </button>
        </div>

        {view === "list" ? (
          <section className="task-list-box">
            <header className="task-list-header">
              <div>
                <h2>Mes tâches assignées</h2>
                <p>Par ordre de priorité</p>
              </div>

              <label className="task-search" htmlFor="task-search">
                <input id="task-search" type="text" placeholder="Rechercher une tâche" />
                <span>⌕</span>
              </label>
            </header>

            <div className="task-list-items">
              {TASKS.slice(0, 6).map((task) => (
                <TaskRowCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        ) : (
          <section className="kanban-board">
            <KanbanColumn title="À faire" tasks={kanbanColumns.TODO} status="TODO" />
            <KanbanColumn title="En cours" tasks={kanbanColumns.IN_PROGRESS} status="IN_PROGRESS" />
            <KanbanColumn title="Terminées" tasks={kanbanColumns.DONE} status="DONE" />
          </section>
        )}
      </section>

      <WorkspaceFooter />
    </main>
  );
}

type TaskRowCardProps = {
  task: Task;
};

function TaskRowCard({ task }: TaskRowCardProps) {
  return (
    <article className="task-row-card">
      <div className="task-row-main">
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-meta">
          <span>📁 {task.projectName}</span>
          <span>🕒 {task.dueText}</span>
          <span>💬 {task.commentsCount}</span>
        </div>
      </div>

      <div className="task-row-side">
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {STATUS_LABEL[task.status]}
        </span>
        <button type="button" className="task-view-btn">
          Voir
        </button>
      </div>
    </article>
  );
}

type KanbanColumnProps = {
  title: string;
  tasks: Task[];
  status: Task["status"];
};

function KanbanColumn({ title, tasks, status }: KanbanColumnProps) {
  return (
    <section className="kanban-column">
      <header className="kanban-column-header">
        <h2>{title}</h2>
        <span>{tasks.length}</span>
      </header>

      <div className="kanban-items">
        {tasks.slice(0, 4).map((task) => (
          <article key={task.id} className="kanban-task-card">
            <div className="task-row-main">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="task-meta">
                <span>📁 {task.projectName}</span>
                <span>🕒 {task.dueText}</span>
                <span>💬 {task.commentsCount}</span>
              </div>
            </div>

            <div className="kanban-card-bottom">
              <span className={`status-badge status-${status.toLowerCase()}`}>
                {STATUS_LABEL[status]}
              </span>
              <button type="button" className="task-view-btn">
                Voir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
