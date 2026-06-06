import type { Metadata } from "next";
import { LearningProvider } from "@/hooks/use-learning-state";
import { AppShell } from "@/components/app-shell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "English Practice",
  description: "A lightweight English reading, listening, and vocabulary practice app.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LearningProvider>
          <AppShell>{children}</AppShell>
        </LearningProvider>
      </body>
    </html>
  );
}
