import Header from "../components/common/Header";
import Signup from "../components/common/SignUp";
import background from "../img/background.jpg";

export default function SignupPage() {
  return (
    <>
      <div className="relative">
        <img
          src={background}
          alt="#"
          className="z-0 absolute w-full h-full object-cover filter brightness-50"
        />
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 C">
          <div className="max-w-md w-full space-y-8 p-4 bg-black rounded-2xl shadow-2xl z-10">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup />
          </div>
        </div>
      </div>
    </>
  );
}
