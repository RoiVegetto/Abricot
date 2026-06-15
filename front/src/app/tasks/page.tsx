import { AppShell } from "@/components/layout/app-shell";

export default function TasksPage() {
  return (
    <AppShell
      title="Mes taches"
      subtitle="Vue liste orientee execution personnelle avec tri par urgence."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Prochaine etape</h2>
        <p className="text-sm text-slate-700">
          Cette page affichera principalement les taches assignees a l&apos;utilisateur connecte.
        </p>
      </section>
    </AppShell>
  );
}
