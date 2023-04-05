"use client";

import { useRouter } from "next/navigation";
import { register, signin } from "@/lib/api";
import Input from "./UI/Input";
import Button from "./UI/Button";
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
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};
const initialState = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initialState });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }
        router.replace("/home");
      } catch (err) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initialState });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );
  const content = mode === "register" ? registerContent : signinContent;
  return (
    <Card>
      <div className={styles.formWrapper}>
        <div>
          <h2>{content.header}</h2>
          <p>{content.subheader}</p>
        </div>
        <form className={styles.form}>
          {mode === "register" && (
            <div className={`${styles.fieldWrapper} flexy`}>
              <div className={styles.nameWrapper}>
                <div className={styles.inputLabel}>First Name</div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className={styles.input}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.nameWrapper}>
                <div className={styles.inputLabel}>Last Name</div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className={styles.input}
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
            <div className={styles.inputLabel}>Email</div>
            <Input
              required
              type="email"
              placeholder="email"
              value={formState.email}
              className={styles.input}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className={styles.nameWrapper}>
            <div className={styles.inputLabel}>Password</div>
            <Input
              required
              type="password"
              placeholder="password"
              value={formState.password}
              className={styles.input}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className={`flexy ${styles.linkWrapper}`}>
            <div>
              <span>
                <Link href={content.linkUrl}>{content.linkText}</Link>
              </span>
            </div>
            <div>
              <Button type="submit" className="secondary small">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
