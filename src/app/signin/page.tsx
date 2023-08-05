import { AuthLayout } from "@/layouts";
import { SignInForm } from "@/components";
import { SigninErrorCodes } from "@/types";

export default function Page({
  searchParams: { error_code, identity },
}: {
  searchParams: { error_code?: SigninErrorCodes; identity?: string };
}) {
  return (
    <AuthLayout>
      <SignInForm
        initialIdentity={identity}
        errorCode={error_code as SigninErrorCodes}
      />
    </AuthLayout>
  );
}
