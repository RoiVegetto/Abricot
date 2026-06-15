"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import logoOrange from "@/assets/logos/logo-orange.png";
import imageConnexion from "@/assets/images/image-connexion.jpg";
import { apiClient } from "@/lib/api/client";
import "./login.css";

export default function Connexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const response = await apiClient.auth.login({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (!response.success || !response.data?.token || !response.data.user) {
      setErrorMessage(response.message || "Connexion impossible");
      return;
    }

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("authUser", JSON.stringify(response.data.user));

    router.push("/dashboard");
  };

  return (
    <main className="auth-page auth-page-login">
      <section className="auth-panel">
        {/* Logo principal selon la maquette */}
        <Image src={logoOrange} alt="Abricot" className="auth-logo" priority />

        {/* Bloc formulaire central */}
        <div className="auth-form-wrap">
          <h1 className="auth-title">Connexion</h1>

          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="login-email" className="auth-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="login-password" className="auth-label">
              Mot de passe
            </label>
            <input
              id="login-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

          <button type="button" className="auth-forgot">
            Mot de passe oublié?
          </button>
        </div>

        {/* Lien de bascule vers l'inscription */}
        <p className="auth-footer">
          Pas encore de compte ? <Link href="/register">Créer un compte</Link>
        </p>
      </section>

      <section className="auth-visual" aria-hidden="true">
        <Image src={imageConnexion} alt="" className="auth-image" priority />
      </section>
    </main>
  );
}
