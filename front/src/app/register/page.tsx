"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import logoOrange from "@/assets/logos/logo-orange.png";
import imageInscription from "@/assets/images/image-inscription.jpg";
import { apiClient } from "@/lib/api/client";
import "./register.css";

export default function Inscription() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const response = await apiClient.auth.register({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (!response.success || !response.data?.token || !response.data.user) {
      setErrorMessage(response.message || "Inscription impossible");
      return;
    }

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("authUser", JSON.stringify(response.data.user));

    router.push("/dashboard");
  };

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-panel">
        {/* Logo principal selon la maquette */}
        <Image src={logoOrange} alt="Abricot" className="auth-logo" priority />

        {/* Bloc formulaire central */}
        <div className="auth-form-wrap">
          <h1 className="auth-title">Inscription</h1>

          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="register-email" className="auth-label">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="register-password" className="auth-label">
              Mot de passe
            </label>
            <input
              id="register-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
        </div>

        {/* Lien de bascule vers la connexion */}
        <p className="auth-footer">
          Déjà inscrit ? <Link href="/login">Se connecter</Link>
        </p>
      </section>

      <section className="auth-visual" aria-hidden="true">
        <Image src={imageInscription} alt="" className="auth-image" priority />
      </section>
    </main>
  );
}
