"use client";

import { useRouter } from "next/navigation";
import { register, signin } from "@/lib/api";
import Input from "./UI/Input";
import Card from "./UI/Card";
import { useCallback, useState } from "react";
import styles from "./AuthForm.module.scss";
import Link from "next/link";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};
const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back 😎",
  subheader: "Sign In to access your account",
  buttonText: "Sign In",
};
const initialState = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initialState });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await register(formState);
        router.replace("/signin");
      } else {
        await signin(formState);
        router.replace("/home");
      }
    } catch (err) {
      setError(`Could not ${mode}, please check the detail and try again`);
    } finally {
      setFormState({ ...initialState });
    }
  };
  const content = mode === "register" ? registerContent : signinContent;
  return (
    <Card>
      <div className={styles.formWrapper}>
        <div>
          <h1>{content.header}</h1>
          <p className="small">{content.subheader}</p>
          {error.length > 0 && <p className="small warning">{error}</p>}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === "register" && (
            <div className={styles.nameField}>
              <div className={styles.nameWrapper}>
                <p className={`${styles.inputLabel} small`}>First Name</p>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="formInput"
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.nameWrapper}>
                <p className={`${styles.inputLabel} small`}>Last Name</p>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="formInput"
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <div className={styles.fieldWrapper}>
            <p className={`${styles.inputLabel} small`}>Email</p>
            <Input
              required
              type="email"
              placeholder="email"
              value={formState.email}
              className="formInput"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className={styles.fieldWrapper}>
            <p className={`${styles.inputLabel} small`}>Password</p>
            <Input
              required
              type="password"
              placeholder="password"
              value={formState.password}
              className="formInput"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className={styles.linkWrapper}>
            <div>
              <p className="bold small">
                <Link href={content.linkUrl}>{content.linkText}</Link>
              </p>
            </div>
            <div>
              <button type="submit" className="secondary small">
                {content.buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
