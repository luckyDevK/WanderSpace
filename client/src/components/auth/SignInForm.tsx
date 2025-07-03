import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInSchema } from '@/schema/schema';

import ErrorMsg from './ErrorMsg';

import { useAuth } from '@/hooks/useAuth';
import TogglePw from './TogglePw';

type SignInForm = z.infer<typeof SignInSchema>;

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(SignInSchema) });

  const auth = useAuth();

  const handleSignIn = auth?.handleSignIn;

  return (
    <div
      className={cn(' flex flex-col gap-6 w-[90%] mx-auto md:mx-0', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email or username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => {
              if (handleSignIn) {
                handleSignIn(data);
              }
            })}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="identifier">Email / Username</Label>
                <Input
                  id="identifier"
                  {...register('identifier')}
                  type="text"
                  placeholder="mo@gmail.com / johnDoe12"
                />
                {errors.identifier?.message && (
                  <ErrorMsg msg={errors.identifier?.message} />
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <TogglePw
                  id="password"
                  placeholder="type your password"
                  {...register('password')}
                />
                {errors.password?.message && (
                  <ErrorMsg msg={errors.password?.message} />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
