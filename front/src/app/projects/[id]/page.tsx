import { AppShell } from "@/components/layout/app-shell";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // Avec App Router, le segment dynamique [id] est disponible via params.
  const { id } = await params;

  return (
    <AppShell
      title={`Projet: ${id}`}
      subtitle="Vue detaillee du projet (infos, membres, taches, actions selon role)."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Prochaine etape</h2>
        <p className="text-sm text-slate-700">
          Cette page utilisera l&apos;endpoint GET /projects/:id pour afficher les details du projet
          et les permissions de l&apos;utilisateur.
        </p>
      </section>
    </AppShell>
  );
}
