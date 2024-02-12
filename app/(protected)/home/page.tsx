import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      This is a protected page: {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button variant={"outline"}>Logout</Button>
      </form>
    </main>
  );
}
