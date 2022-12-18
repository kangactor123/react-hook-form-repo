import ControlInputText from "component/ControlInputText";
import MInputText from "component/mui/MInputText";
import MRadio, { TRadioGroup } from "component/mui/MRadio";
import MSelect, { ISelectItem } from "component/mui/MSelect";
import { useForm } from "react-hook-form";
import { Row, Label } from "style";

interface TForm {
  occupation: string;
  id: string;
  name: string;
  pwd: string;
  email: string;
  phone: string;
  identity: string;
}

function ReactHookForm() {
  const {
    register,
    control,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    mode: "onSubmit",
    defaultValues: {
      occupation: "student",
      id: "",
      name: "",
      pwd: "",
      email: "",
      phone: "",
      identity: "child",
    },
  });

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

  const handleSubmit = (data: TForm) => {
    // console.log(data);
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Row>
        <Label>Occupation: </Label>&nbsp;
        <MRadio group={radioGroup} name="occupation" control={control} />
      </Row>
      <Row>
        <Label>name: </Label>
        <MInputText<TForm>
          control={control}
          name="name"
          rules={{
            required: "반드시 입력해주세요",
            maxLength: { value: 10, message: "최대 10글자 입력이 가능합니다." },
          }}
        />
        {errors.name ? <p className="error">{errors.name?.message}</p> : null}
      </Row>
      <Row>
        <Label>id: </Label>
        <ControlInputText<TForm>
          control={control}
          name="id"
          rules={{
            required: "반드시 입력해주세요",
            max: { value: 10, message: "최대 10글자 입력이 가능합니다." },
            min: { value: 3, message: "3글자 이상 입력해주세요." },
          }}
        />
      </Row>
      <Row>
        <Label>pwd: </Label>
        <ControlInputText<TForm> control={control} name="pwd" />
      </Row>
      <Row>
        <Label>email: </Label>
        <input
          type="text"
          {...register("email", {
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors?.email ? (
          <p className="error">{errors.email?.message}</p>
        ) : null}
      </Row>
      {watch("occupation") === "professor" ? (
        <Row>
          <Label>phone: </Label>
          <ControlInputText<TForm> control={control} name="phone" />
        </Row>
      ) : null}
      <Row>
        <Label>identity: </Label>
        <MSelect
          control={control}
          name="identity"
          selectList={selectList}
          placeholder={"선택해주세요"}
        />
      </Row>
      <button>Submit</button>
    </form>
  );
}

export default ReactHookForm;
