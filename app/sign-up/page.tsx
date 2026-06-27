import type { Metadata } from "next";
import Link from "next/link";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up · Bookstagram",
  description: "Create your Bookstagram account",
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Create your account"
      description="Start tracking books, challenges, and your reading habits."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthPageShell>
  );
}
