import type { Metadata } from "next";
import Link from "next/link";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in · Bookstagram",
  description: "Sign in to your Bookstagram reading dashboard",
};

export default function SignInPage() {
  return (
    <AuthPageShell
      title="Welcome back"
      description="Sign in to continue tracking your reading journey."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthPageShell>
  );
}
