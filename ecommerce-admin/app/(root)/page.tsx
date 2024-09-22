import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex items-center gap-3 p-4">
      <h1>Admin Dashboard</h1>
      <UserButton />
    </div>
  );
}
