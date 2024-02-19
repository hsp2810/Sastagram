import { DEVELOPMENT_URL } from "@/routes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerficationEmail = async (to: string, token: string) => {
  const confirmLink = `${DEVELOPMENT_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject: "Confirm your email",
    html: `<h1><a href=${confirmLink}>Confirm your email</a></h1>`,
  });
};
