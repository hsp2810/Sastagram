import { Metadata } from "next";
import AuthProvider from "./_components/auth-provider";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Home() {
  return <AuthProvider />;
}
