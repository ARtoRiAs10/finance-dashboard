import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs"; // Add ClerkProvider import
import { Header } from "@/components/header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider> {/* Wrap with ClerkProvider */}
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </ClerkProvider>
  );
};

export default DashboardLayout;