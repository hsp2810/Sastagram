import { prisma } from "@/lib/prisma";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verficationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verficationToken;
  } catch (error) {
    return null;
  }
};

// Find the verfication token using email as a token is associated with just one email
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verficationToken;
  } catch (error) {
    return null;
  }
};
