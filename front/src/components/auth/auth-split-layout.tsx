import Link from "next/link";

type AuthSplitLayoutProps = {
  title: string;
  submitLabel: string;
  alternateQuestion: string;
  alternateLinkLabel: string;
  alternateLinkHref: string;
  forgotPassword?: boolean;
  visualVariant?: "login" | "register";
};

// Ce composant gere la structure complete des pages d'authentification.
// Objectif: eviter la duplication et garder un code simple a comprendre.
export function AuthSplitLayout({
  title,
  submitLabel,
  alternateQuestion,
  alternateLinkLabel,
  alternateLinkHref,
  forgotPassword = false,
  visualVariant = "login",
}: AuthSplitLayoutProps) {
  return (
    <main className="min-h-screen bg-[#ebedef]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[420px_1fr]">
        {/* Colonne gauche: zone formulaire fixe, proche de la maquette. */}
        <section className="flex min-h-screen flex-col bg-[#ebedef] px-8 py-10 sm:px-14 lg:px-16">
          <header>
            <p className="font-display text-5xl leading-none tracking-tight text-[#d95f02]">
              ABRICOT
            </p>
          </header>

          {/* Zone centrale: titre + champs + bouton principal. */}
          <div className="mx-auto mt-20 flex w-full max-w-[320px] flex-1 flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-[#d95f02]">{title}</h1>

            <form className="mt-10 space-y-7" noValidate>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xl font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="h-14 w-full rounded-[6px] border border-[#d8dde4] bg-white px-4 text-lg text-slate-900 outline-none transition focus:border-[#d95f02] focus:ring-2 focus:ring-[#ffd7b2]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xl font-medium text-slate-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={visualVariant === "login" ? "current-password" : "new-password"}
                  className="h-14 w-full rounded-[6px] border border-[#d8dde4] bg-white px-4 text-lg text-slate-900 outline-none transition focus:border-[#d95f02] focus:ring-2 focus:ring-[#ffd7b2]"
                />
              </div>

              <button
                type="button"
                className="mt-1 h-14 w-full rounded-[10px] bg-[#1f1f21] text-xl font-semibold text-white transition hover:bg-black"
              >
                {submitLabel}
              </button>

              {forgotPassword ? (
                <p className="pt-1 text-center text-base text-[#d95f02] underline underline-offset-2">
                  Mot de passe oublie?
                </p>
              ) : null}
            </form>
          </div>

          {/* Bas de page: lien vers l'autre ecran d'authentification. */}
          <footer className="mx-auto mt-10 w-full max-w-[320px] pb-6 text-center text-base text-slate-700">
            {alternateQuestion}{" "}
            <Link
              href={alternateLinkHref}
              className="font-semibold text-[#d95f02] underline underline-offset-2"
            >
              {alternateLinkLabel}
            </Link>
          </footer>
        </section>

        {/* Colonne droite: visuel hero, cache en mobile pour rester lisible. */}
        <section className="relative hidden overflow-hidden lg:block">
          <AuthVisual variant={visualVariant} />
        </section>
      </div>
    </main>
  );
}

type AuthVisualProps = {
  variant: "login" | "register";
};

function AuthVisual({ variant }: AuthVisualProps) {
  const isLogin = variant === "login";

  return (
    <div
      className={`relative h-full w-full ${
        isLogin
          ? "bg-[radial-gradient(circle_at_80%_75%,#ff8a1f_0%,#ff8a1f_12%,transparent_42%),radial-gradient(circle_at_24%_24%,#0b78bb_0%,#0b78bb_18%,transparent_45%),linear-gradient(135deg,#f8f8fa_0%,#ffffff_56%,#fff7ef_100%)]"
          : "bg-[radial-gradient(circle_at_18%_82%,#ff8a1f_0%,#ff8a1f_12%,transparent_35%),radial-gradient(circle_at_75%_80%,#0f3d77_0%,#0f3d77_17%,transparent_50%),linear-gradient(130deg,#f7f8fb_0%,#ffffff_50%,#fff7ee_100%)]"
      }`}
    >
      {/* Formes decoratives pour rappeler l'esprit de la maquette sans image asset. */}
      <div className="absolute left-[10%] top-[10%] h-28 w-80 rounded-2xl bg-white/85 shadow-[0_20px_60px_rgba(0,0,0,0.08)]" />
      <div className="absolute right-[18%] top-[18%] h-16 w-16 rounded-full bg-white/95 shadow-[0_14px_34px_rgba(0,0,0,0.14)]" />
      <div className="absolute bottom-[16%] left-[24%] h-4 w-72 rounded-full bg-[#0d6fb2]/85" />
      <div className="absolute bottom-[24%] right-[12%] h-80 w-14 rotate-[22deg] rounded-full bg-[#f2d11f] shadow-[0_12px_30px_rgba(0,0,0,0.2)]" />
      <div className="absolute bottom-[8%] right-[8%] h-72 w-56 rounded-2xl bg-[#f8f8fb]/90 shadow-[0_20px_46px_rgba(0,0,0,0.12)]" />
      <div className="absolute bottom-[20%] left-[38%] h-56 w-6 rotate-[-35deg] rounded-full bg-[#1d5fc0] shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_78%,rgba(255,255,255,0.2)_100%)]" />
    </div>
  );
}
