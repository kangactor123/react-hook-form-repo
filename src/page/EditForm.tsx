import React from "react";
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
  occupation: "",
  identity: "",
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

function EditForm({ mode }: EditProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit: onSubmit,
    reset,
    watch,
  } = useForm<TForm>({
    defaultValues,
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = (data: TForm) => {
    console.log(data);
  };

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
        identity: "mother",
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Row>
        <Label>Occupation</Label>
        <MRadio<TForm> group={radioGroup} control={control} name="occupation" />
      </Row>
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
