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
import { SignUpSchema } from '@/schema/schema';

import { useAuth } from '@/context/useAuth';
import TogglePw from './TogglePw';
import ErrorMsg from './ErrorMsg';

type SignupForm = z.infer<typeof SignUpSchema>;

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignUpSchema),
  });

  const { handleSignUp } = useAuth();

  console.log(errors);

  return (
    <div className={cn(' flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your first account</CardTitle>
          <CardDescription>
            Enter your email or username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => handleSignUp(data))}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register('username')}
                  id="username"
                  type="text"
                  placeholder="johnDoe12"
                />
                {errors.username?.message && (
                  <ErrorMsg msg={errors.username?.message} />
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  placeholder="wanderSpace@yahoo.com"
                />
                {errors.email?.message && (
                  <ErrorMsg msg={errors.email?.message} />
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <TogglePw id="password" {...register('password')} />
                {errors.password?.message && (
                  <ErrorMsg msg={errors.password?.message} />
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPw">Confirm Password</Label>
                </div>
                <TogglePw id="confirmPw" {...register('confirmPw')} />
                {errors.confirmPw?.message && (
                  <ErrorMsg msg={errors.confirmPw?.message} />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a href="/signin" className="underline underline-offset-4">
                Sign In
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
