import { AppNav } from "@/components/layout/app-nav";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

// Layout principal reutilisable pour les pages authentifiees.
// L'objectif est d'uniformiser l'affichage et simplifier la lecture du code.
export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-card border border-border bg-surface-0 p-5 shadow-sm">
        <p className="font-display text-sm uppercase tracking-[0.12em] text-brand-600">
          Abricot.co
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>

        <div className="mt-4 border-t border-border pt-4">
          <AppNav />
        </div>
      </header>

      <main className="rounded-card border border-border bg-surface-0 p-5 shadow-sm">
        {children}
      </main>
    </div>
  );
}
