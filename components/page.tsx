import { Metadata } from "next";
import AuthProvider from "../app/_components/auth/auth-provider";

export const metadata: Metadata = {
  title: "SastaGram-Authentication",
  description: "Authentication forms built using the components.",
};

export default function Home() {
  return <AuthProvider />;
}
