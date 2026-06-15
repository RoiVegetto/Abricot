import Image from "next/image";
import Link from "next/link";
import logoOrange from "@/assets/logos/logo-orange.png";
import "@/components/layout/workspace-header.css";

type WorkspaceHeaderProps = {
  activeTab: "dashboard" | "projects";
  userInitials?: string;
};

// Header partage entre les ecrans authentifies.
// Un seul composant maintient le meme rendu sur toutes les pages.
export function WorkspaceHeader({ activeTab, userInitials = "AD" }: WorkspaceHeaderProps) {
  return (
    <header className="workspace-header">
      <Image src={logoOrange} alt="Abricot" className="workspace-header-logo" priority />

      <nav className="workspace-header-nav" aria-label="Navigation principale">
        <Link
          href="/dashboard"
          className={`workspace-header-link ${activeTab === "dashboard" ? "is-active" : ""}`}
        >
          <span aria-hidden="true">▦</span> Tableau de bord
        </Link>

        <Link
          href="/projects"
          className={`workspace-header-link ${activeTab === "projects" ? "is-active" : ""}`}
        >
          <span aria-hidden="true">📁</span> Projets
        </Link>
      </nav>

      <button type="button" className="workspace-header-avatar" aria-label="Profil utilisateur">
        {userInitials}
      </button>
    </header>
  );
}
