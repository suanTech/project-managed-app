import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Register",
  description: "Register to use our feature",
};

export default function Register() {
  return (
    <AuthForm mode='register'></AuthForm>
  )
}
