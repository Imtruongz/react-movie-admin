import Header from "../components/common/Header";
import ForgotPw from "../components/common/ForgotPw";
import background from "../img/background.jpg";

export default function LoginPage() {
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
              heading="Reset password"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
            />
            <ForgotPw linkName="home" linkUrl="/home" />
          </div>
        </div>
      </div>
    </>
  );
}
