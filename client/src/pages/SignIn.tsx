import SignInForm from '@/components/auth/SignInForm';
import PreviousBtn from '@/components/auth/PreviousBtn';

export default function SignIn() {
  return (
    <>
      <PreviousBtn />
      <div className="min-h-screen mx-auto max-w-md mt-25">
        <h3 className="scroll-m-20 text-2xl text-center mb-10 font-semibold tracking-tight">
          Welcome back to WanderSpace
        </h3>
        <SignInForm />
      </div>
    </>
  );
}
