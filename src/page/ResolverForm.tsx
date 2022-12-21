import { TForm } from "common/type";
import ControlInputText from "component/ControlInputText";
import MInputText from "component/mui/MInputText";
import MRadio, { TRadioGroup } from "component/mui/MRadio";
import MSelect, { ISelectItem } from "component/mui/MSelect";
import { useForm } from "react-hook-form";
import { Row, Label } from "style";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("반드시 입력해주세요.")
    .max(10, "최대 10글자까지 입력 가능합니다."),
  id: yup
    .string()
    .required("반드시 입력해주세요.")
    .min(1, "한 글자 이상 입력해주세요")
    .max(10, "최대 10글자 입력 가능합니다"),
  pwd: yup.string().required("반드시 입력해주세요."),
  email: yup
    .string()
    .required("반드시 입력해주세요.")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
      "이메일 형식에 맞지 않습니다."
    ),
  phone: yup.string().when("occupation", {
    is: "professor",
    then: yup.string().required("직업이 교수님이라면 반드시 입력해주세요!!!!"),
  }),
  identity: yup.string().required("반드시 입력해주세요."),
  occupation: yup.string().required("반드시 입력해주세요."),
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

function ResolverForm() {
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
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: TForm) => {
    // console.log(data);
  };

  console.log(errors);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Row>
        <Label>Occupation: </Label>&nbsp;
        <MRadio group={radioGroup} name="occupation" control={control} />
      </Row>
      <Row>
        <Label>name: </Label>
        <MInputText<TForm> control={control} name="name" />
        {errors.name ? <p className="error">{errors.name?.message}</p> : null}
      </Row>
      <Row>
        <Label>id: </Label>
        <ControlInputText<TForm> control={control} name="id" />
        {errors?.id ? <p className="error">{errors.id?.message}</p> : null}
      </Row>
      <Row>
        <Label>pwd: </Label>
        <ControlInputText<TForm> control={control} name="pwd" />
        {errors?.pwd ? <p className="error">{errors.pwd?.message}</p> : null}
      </Row>
      <Row>
        <Label>email: </Label>
        <input type="text" {...register("email")} />
        {errors?.email ? (
          <p className="error">{errors.email?.message}</p>
        ) : null}
      </Row>
      {watch("occupation") === "professor" ? (
        <Row>
          <Label>phone: </Label>
          <ControlInputText<TForm> control={control} name="phone" />
          {errors?.phone ? (
            <p className="error">{errors.phone?.message}</p>
          ) : null}
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
        {errors?.identity ? (
          <p className="error">{errors.email?.message}</p>
        ) : null}
      </Row>
      <button>Submit</button>
    </form>
  );
}

export default ResolverForm;
