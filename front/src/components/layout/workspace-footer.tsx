import Image from "next/image";
import logoBlack from "@/assets/logos/logo-black.png";
import "@/components/layout/workspace-footer.css";

type WorkspaceFooterProps = {
  yearText?: string;
};

// Footer partage entre les ecrans authentifies.
// Meme rendu sur toutes les pages qui utilisent ce composant.
export function WorkspaceFooter({ yearText = "Abricot 2025" }: WorkspaceFooterProps) {
  return (
    <footer className="workspace-footer">
      <Image src={logoBlack} alt="Abricot" className="workspace-footer-logo" />
      <p>{yearText}</p>
    </footer>
  );
}
