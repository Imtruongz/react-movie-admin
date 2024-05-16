import Header from "../components/common/Header";
import Login from "../components/common/Login";
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
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 p-7 bg-black rounded-2xl shadow-2xl z-10">
            <Header
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
            />
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
