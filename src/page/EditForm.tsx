import React, { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TForm } from "common/type";
import MInputText from "component/mui/MInputText";
import MRadio, { TRadioGroup } from "component/mui/MRadio";
import MSelect, { ISelectItem } from "component/mui/MSelect";
import { getList } from "module/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, Row } from "style";

type EditProps = {
  mode: "edit" | "create";
};

const defaultValues = {
  id: "",
  pwd: "",
  name: "",
  phone: "",
  email: "",
  occupation: "professor",
  identity: "child",
  score: "major",
  level: "first",
};

const selectList: ISelectItem[] = [
  { label: "child", value: "child" },
  { label: "father", value: "father" },
  { label: "mother", value: "mother" },
  { label: "grandfather", value: "mather", disabled: true },
  { label: "grandmother", value: "grandmother" },
];

const radioGroup: TRadioGroup[] = [
  { label: "professor", value: "professor" },
  { label: "student", value: "student" },
];

const scoreGroup: TRadioGroup[] = [
  { label: "major", value: "major" },
  { label: "minor", value: "minor" },
];

const levelGroup: TRadioGroup[] = [
  { label: "first", value: "first" },
  { label: "second", value: "second" },
  { label: "third", value: "third" },
];

function EditForm({ mode }: EditProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit: onSubmit,
    setValue,
    reset,
    watch,
  } = useForm<TForm>({
    defaultValues,
    mode: "all",
  });

  const { occupation } = watch();

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = (data: TForm) => {
    console.log(data);
  };

  /** 기존 useQuery 를 통해 데이터를 폼에 주입했던 방식
  const { data } = useQuery(["list"], getList, {
    enabled: !!id,
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      reset({
        ...data,
      });
    }
  }, []);
  */

  useQuery(["list"], getList, {
    enabled: !!id,
    refetchOnMount: "always",
    onSuccess: (data: TForm) => {
      reset(data);
    },
    select: (data: TForm[]) => data.find((data) => data.id === id) as TForm,
  });

  useEffect(() => {
    if (mode === "create") {
      reset({
        ...watch(),
        occupation: "professor",
        identity: "father",
        score: "grand",
        level: "first",
      });
    }
  }, []);

  useLayoutEffect(() => {
    switch (occupation) {
      case "professor": {
        setValue("score", "grand");
        break;
      }
      case "student": {
        setValue("score", "minor");
        break;
      }
    }
  }, [occupation, setValue]);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Row>
        <Label>Occupation</Label>
        <MRadio<TForm> group={radioGroup} control={control} name="occupation" />
      </Row>
      <Row>
        <Label>Score</Label>
        <MRadio<TForm> group={scoreGroup} control={control} name="score" />
      </Row>
      {occupation === "student" ? (
        <Row>
          <Label>Level</Label>
          <MRadio<TForm> group={levelGroup} control={control} name="level" />
        </Row>
      ) : null}
      <Row>
        <Label>Id</Label>
        <MInputText<TForm> control={control} name="id" />
      </Row>
      <Row>
        <Label>Pwd</Label>
        <MInputText<TForm> control={control} name="pwd" />
      </Row>
      <Row>
        <Label>Name</Label>
        <MInputText<TForm> control={control} name="name" />
      </Row>
      <Row>
        <Label>Phone</Label>
        <MInputText<TForm> control={control} name="phone" />
      </Row>
      {watch("occupation") === "professor" ? (
        <Row>
          <Label>E-mail</Label>
          <MInputText<TForm>
            control={control}
            name="email"
            rules={{ required: watch("occupation") === "professor" }}
          />
        </Row>
      ) : null}
      <Row>
        <Label>Identity</Label>
        <MSelect<TForm>
          control={control}
          name="identity"
          selectList={selectList}
          placeholder={"Choose One"}
        />
      </Row>
      <br />
      <Button>Submit</Button>&nbsp;&nbsp;
      <Button onClick={handleBack}>Back</Button>
    </form>
  );
}

export default EditForm;
