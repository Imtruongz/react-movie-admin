import { useState } from "react";
import { signupFields } from "../../constants/FormFieldsAuth";
import FormAction from "./FormAction";
import Input from "./InputAuth";
import { useNavigate } from "react-router-dom";
import { handleSignUpApi } from "../../services/userService";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(fieldsState);
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(signupState);
    createAccount(e);
  };

  //handle Signup API Integration here
  const createAccount = async (e) => {
    const roleID = 2;
    try {
      setErrMessage("");
      let data = await handleSignUpApi(
        e.target.email.value,
        e.target.password.value,
        roleID
      );
      if (e.target.password.value !== e.target.confirm_password.value) {
        setErrMessage("Please re-enter your password");
      } else {
        if (data && data.errCode !== 0) {
          setErrMessage(data.message);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
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
        <div>
          <p className="text-red-700">{errMessage}</p>
        </div>
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
