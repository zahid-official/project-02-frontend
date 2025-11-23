import LoginForm from "@/components/modules/auth/login/LoginForm";
import LoginLottie from "@/components/modules/auth/login/LoginLottie";
import { Card, CardContent } from "@/components/ui/card";

interface IProps {
  searchParams?: Promise<{ redirect?: string }>;
}

// LoginPage Component
const LoginPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;

  return (
    <div className="bg-muted flex flex-col items-center justify-center px-6 md:p-32">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              {/* Left Column */}
              <div className="p-6 md:px-8 pt-13 pb-8">
                {/* Heading */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Medicare account
                  </p>
                </div>

                {/* Form */}
                <LoginForm redirect={params?.redirect} />
              </div>

              {/* Right Column */}
              <div className="bg-muted relative hidden md:block">
                <LoginLottie />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
