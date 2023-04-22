import AuthForm from "@/components/AuthForm";
export const metadata = {
  title: "Sign In",
};
export default function page() {
  return (
    <AuthForm mode="signin"/>
  )
}
