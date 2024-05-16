import { useState } from "react";
import { ForgotPwFields } from "../../constants/FormFieldsAuth";
import FormAction from "./FormAction";
import Input from "./InputAuth";

const fields = ForgotPwFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function ForgotPw() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = () => {};

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

      <FormAction handleSubmit={handleSubmit} text="Reset" />
    </form>
  );
}
