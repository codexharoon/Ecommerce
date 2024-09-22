export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
}
