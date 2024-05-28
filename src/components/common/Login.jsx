import { useContext, useState } from "react";
import { loginFields } from "../../constants/FormFieldsAuth";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./InputAuth";
import { handleLoginApi } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate();

  const { loginContext } = useContext(UserContext);

  const [loginState, setLoginState] = useState(fieldsState);
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(e);
  };

  // Handle Login API Integration here
  const authenticateUser = async (e) => {
    try {
      setErrMessage("");
      let response = await handleLoginApi(
        e.target.email.value,
        e.target.password.value
      );
      if (response && response.errCode !== 0) {
        setErrMessage(response.message);
      } else {
        // Lưu thông tin người dùng vào localStorage hoặc trong global state
        const email = response.user.email;
        const roleID = response.user.roleID;
        const fullName = response.user.fullName;
        let data = {
          isAuthenticated: true,
          token: response.access_token,
          account: { email, roleID, fullName },
        };
        localStorage.setItem("jwt", response.access_token);
        // sessionStorage.setItem('userData', JSON.stringify(data));
        loginContext(data);
        // Chuyển hướng dựa trên phản hồi từ backend
        navigate(response.redirectURL);
      }
    } catch (error) {
      console.log("Error in authenticateUser:", error);
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass={field.customClass}
          />
        ))}
      </div>
      <div>
        <p className="text-red-700">{errMessage}</p>
      </div>
      <FormExtra linkName="Forgot your password?" linkUrl={"/ForgotPw"} />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
