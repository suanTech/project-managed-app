"use client";

import { useRouter } from "next/navigation";
import { register, signin } from "@/lib/api";
import Card from "./UI/Card";
import { useState } from "react";
import styles from "./AuthForm.module.scss";
import Link from "next/link";
import Button from "./UI/Button";
import Spinner from "./UI/Spinner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
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
      setIsSubmitting(false);
      setFormState({ ...initialState });
    }
  };
  const content = mode === "register" ? registerContent : signinContent;
  return (
    <Card>
      <div className={styles.formWrapper}>
        <div>
          <h1>{content.header}</h1>
          <p>{content.subheader}</p>
          {error.length > 0 ? <p className="small warning">{error}</p> : null}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === "register" ? (
            <div className={styles.nameField}>
              <div className={styles.nameWrapper}>
                <p className={styles.inputLabel}>First Name</p>
                <input
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
                <p className={styles.inputLabel}>Last Name</p>
                <input
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
          ) : null}
          <div className={styles.fieldWrapper}>
            <p className={styles.inputLabel}>Email</p>
            <input
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
            <p className={styles.inputLabel}>Password</p>
            <input
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
            {isSubmitting ? (
              <Spinner className="small" />
            ) : (
              <div>
                <Button type="submit" btnType="secondary" size="small">
                  {content.buttonText}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
}
