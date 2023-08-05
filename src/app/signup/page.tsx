import { AuthLayout } from "@/layouts";
import { SignUpForm } from "@/components";
import { SignupErrorCodes } from "@/types";

export default function Page({
  searchParams: { error_code, username, email },
}: {
  searchParams: { error_code?: string; username?: string; email?: string };
}) {
  return (
    <AuthLayout>
      <SignUpForm
        initialUsername={username}
        initialEmail={email}
        errorCode={error_code as SignupErrorCodes}
      />
    </AuthLayout>
  );
}
