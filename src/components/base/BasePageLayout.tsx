export const BasePageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-6 flex flex-grow flex-col items-center justify-center gap-8">
    <div className="flex w-full flex-col gap-4 rounded-md bg-gray-100 p-4 shadow-md">
      {children}
    </div>
  </div>
);
