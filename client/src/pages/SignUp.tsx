import SignUpForm from '@/components/auth/SignUpForm';
import PreviousBtn from '@/components/auth/PreviousBtn';

export default function SignUp() {
  return (
    <>
      <PreviousBtn />
      <div className="mx-auto max-w-md mt-25">
        <h3 className=" text-2xl text-center mb-10 font-semibold tracking-tight">
          Welcome to WanderSpace
        </h3>
        <SignUpForm />
      </div>
    </>
  );
}
