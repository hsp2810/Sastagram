import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./database/verification-token";
import { prisma } from "@/lib/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Basically expires after 1 hour
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = prisma.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};

/* Steps 

1. Generate a token
2. Set a expiry
3. Check if there is already a token present.
4. If yes, delete it first and create a new one.


    How to use

    1. When a user registers in the application, create a token and store in db.
    2. Once the user is registered, if they try to login, we have to restrict them, if they haven't confirm their email.
    3. If the user tries to login without confirming the email, we also restricts them to login from there and also it will generate a new token and a new email will be sent.
    4. Email will be sent via resend(Platform).
    5. In resend, we generate a verify-token url which we send via email.
    6. User will click on the link and then we will compare the token will the db stored token
    and if they match we will update emailVerified field in the user table
*/
