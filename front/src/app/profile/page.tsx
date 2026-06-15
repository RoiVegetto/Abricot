import { AppShell } from "@/components/layout/app-shell";

export default function ProfilePage() {
  return (
    <AppShell
      title="Profil"
      subtitle="Gestion des informations personnelles: nom, email et mot de passe."
    >
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Prochaine etape</h2>
        <p className="text-sm text-slate-700">
          Cette page sera connectee aux endpoints /auth/profile et /auth/password.
        </p>
      </section>
    </AppShell>
  );
}
