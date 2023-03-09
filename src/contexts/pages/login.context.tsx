import { useQuery } from "@apollo/client";
import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "../../utils/cookies";
import { GET_USER } from "../../queries/user.query";

type User = {
  username: String;
  email: String;
  password: String;
};

interface LoginContext {
  login: () => void;
  handleValue: (props: { name: string; value: string }) => void;
}
export const LoginContext = createContext({} as LoginContext);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<User>();

  const { refetch } = useQuery(GET_USER, {
    variables: {
      email: value?.email,
      password: value?.password,
    },
  });

  function handleValue(props: { name: string; value: string }) {
    setValue((data) => ({
      ...(data as User),
      [props.name]: props.value,
    }));
  }

  const navigate = useNavigate();
  function login() {
    if ([value?.email, value?.password].includes(undefined)) {
      alert("É preciso preencher todos os campos");
      return;
    }
    refetch().then(({ data }) => {
      if (data["GetUser"].code > 202) {
        alert(data["GetUser"].message);
        return;
      }
      new Cookies().add({
        key: "loginToken",
        value: data["GetUser"].payload.tokenid,
        hourExp: 24,
        place: "/login",
      });
      navigate("/homepage");
    });
  }
  return (
    <LoginContext.Provider value={{ login, handleValue }}>
      {children}
    </LoginContext.Provider>
  );
}
