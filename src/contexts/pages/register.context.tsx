import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../queries/user.query";

type User = {
  username: String;
  email: String;
  password: String;
};
type CreateUser = {
  message: String;
  status: String;
  code: Number;
};

interface RegisterContext {
  register: () => void;
  handleValue: (user: { name: string; value: string }) => void;
}

export const RegisterContext = createContext({} as RegisterContext);

export default function RegisterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [value, setValue] = useState<User>();
  const [CreateUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  function handleValue(props: { name: string; value: string }) {
    setValue((data) => ({
      ...(data as User),
      [props.name]: props.value,
    }));
  }

  function register() {
    if ([value?.username, value?.email, value?.password].includes(undefined)) {
      alert("É preciso preencher todos os campos");
      return;
    }
    CreateUser({
      variables: {
        username: (value as User).username,
        email: (value as User).email,
        password: (value as User).password,
      },
    }).then(({ data }) => {
      if (data["CreateUser"].code !== 201) {
        alert(data["CreateUser"].message);
        return;
      }
      navigate("/login");
    });
  }
  return (
    <RegisterContext.Provider value={{ register, handleValue }}>
      {children}
    </RegisterContext.Provider>
  );
}
