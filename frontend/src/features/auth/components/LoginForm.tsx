import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormValues } from "@/features/auth/lib/schema";

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", rememberMe: true },
  });

  function onSubmit(values: LoginFormValues) {
    // No real auth yet — Phase 1 only wires validation + navigation.
    console.log("Login submitted:", values);
    navigate("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Welcome Back!</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="identifier" className="text-sm font-medium text-foreground">
            Email or Employee ID
          </label>
          <div className="relative mt-1.5">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="identifier"
              autoComplete="username"
              placeholder="Enter your email or employee ID"
              className="pl-10"
              aria-invalid={!!errors.identifier}
              aria-describedby={errors.identifier ? "identifier-error" : undefined}
              {...register("identifier")}
            />
          </div>
          {errors.identifier && (
            <p id="identifier-error" className="mt-1.5 text-xs text-danger">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="mt-1.5">
            <PasswordInput
              id="password"
              icon={Lock}
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1.5 text-xs text-danger">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor="rememberMe" className="text-sm text-foreground">
            Remember me
          </label>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          Sign In
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        Continue with SSO
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Contact your administrator
        </a>
      </p>
    </div>
  );
}
