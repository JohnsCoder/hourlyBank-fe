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

  function handleValue(props: { name: string; value: string }) {
    setValue((data) => ({
      ...(data as User),
      [props.name]: props.value,
    }));
  }

  const navigate = useNavigate();
  async function register() {
    await CreateUser({
      variables: {
        username: value?.username,
        email: value?.email,
        password: value?.password,
      },
    }).then(({ data }) => {
      if (data["CreateUser"].code > 202) {
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
