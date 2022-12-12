import React, { useState } from "react";
import InputText from "../component/InputText";
import { Label, Row } from "../style";

enum Occupation {
  Student = "student",
  Professor = "professor",
}

function NoHookForm() {
  const [occupation, setOccupation] = useState(Occupation.Professor);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    name: {
      invalid: false,
      message: "이름이 너무 깁니다.",
    },
    id: {
      invalid: false,
      message: "id는 3글자 이상, 20글자 이하여야 합니다.",
    },
    pwd: {
      invalid: false,
      message: "비밀번호는 10자 이하여야 합니다.",
    },
    phone: {
      invalid: false,
      message: "전화번호 형식에 맞지 않습니다.",
    },
    email: {
      invalid: false,
      message: "이메일 형식에 맞지 않습니다.",
    },
  });

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };
  const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.currentTarget.value);
  };
  const handlePwd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(event.currentTarget.value);
  };
  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.currentTarget.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleOccupation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(event.currentTarget.value as Occupation);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (name.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          invalid: true,
        },
      }));
    }
    if (id.length < 3 || id.length > 20) {
      setErrors((prev) => ({
        ...prev,
        id: {
          ...prev.id,
          invalid: true,
        },
      }));
    }
    // ...등.. 에러 처리 이후 로직 필요.
  };

  return (
    <form>
      <Row>
        <Label>Occupation: </Label>
        <input
          type="radio"
          name="occupation"
          value="professor"
          defaultChecked
          onChange={handleOccupation}
        />
        <input
          type="radio"
          name="occupation"
          value="student"
          onChange={handleOccupation}
        />
      </Row>
      <Row>
        <Label>name: </Label>
        <InputText value={name} onChange={handleName} />
        {errors.name.invalid ? (
          <p className="error">{errors.name.message}</p>
        ) : null}
      </Row>
      <Row>
        <Label>id: </Label>
        <input type="text" value={id} onChange={handleId} />
        {errors.id.invalid ? (
          <p className="error">{errors.id.message}</p>
        ) : null}
      </Row>
      <Row>
        <Label>pwd: </Label>
        <input type="text" value={pwd} onChange={handlePwd} />
      </Row>
      <Row>
        <Label>phone: </Label>
        <input type="text" value={phone} onChange={handlePhone} />
      </Row>
      {occupation === Occupation.Professor ? (
        <Row>
          <Label>e-mail: </Label>
          <input type="text" value={email} onChange={handleEmail} />
        </Row>
      ) : null}
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default NoHookForm;
