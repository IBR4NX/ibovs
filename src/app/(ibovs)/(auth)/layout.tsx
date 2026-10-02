export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className=" min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full m-auto mt-20 max-w-sm">
            {children}
        </div>
      </div>
    </>
  );
}
