import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthPageShell({
  title,
  description,
  children,
  footer,
}: AuthPageShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex flex-col items-center text-center transition-opacity hover:opacity-80"
      >
        <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <span className="font-serif text-xl font-semibold text-primary">B</span>
        </div>
        <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Bookstagram
        </span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="font-serif text-2xl font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">{children}</CardContent>

        <CardFooter className="justify-center border-0 bg-transparent pt-0 pb-6 text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
}
