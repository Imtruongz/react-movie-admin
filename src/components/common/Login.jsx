import { useState } from "react";
import { loginFields } from "../../constants/FormFieldsAuth";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./InputAuth";
import { handleLoginApi } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate();
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
      let data = await handleLoginApi(
        e.target.email.value,
        e.target.password.value
      );
      if (data && data.errCode !== 0) {
        setErrMessage(data.message);
      } else {
        // Lưu thông tin người dùng vào Local Storage
        localStorage.setItem("userData", JSON.stringify(data.user));
        if (data.user.roleID === 1) {
          navigate("/dashboard/Home");
        }
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
