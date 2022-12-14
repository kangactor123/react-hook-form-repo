import ControlInputText from "component/ControlInputText";
import { FieldValues, useForm } from "react-hook-form";
import { Row, Label } from "style";

interface TForm {
  occupation: string;
  id: string;
  name: string;
  pwd: string;
  email: string;
  phone: string;
}

function ReactHookForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    mode: "onChange",
    defaultValues: {
      occupation: "student",
      id: "",
      name: "",
      pwd: "",
      email: "",
      phone: "",
    },
  });

  console.log(errors);
  return (
    <form>
      <Row>
        <Label>Occupation: </Label>&nbsp;
        <label>student</label>
        <input type="radio" value="student" {...register("occupation")} />
        <label>professor</label>
        <input type="radio" value="professor" {...register("occupation")} />
      </Row>
      <Row>
        <Label>name: </Label>
        <ControlInputText<TForm>
          control={control}
          name="name"
          rules={{
            required: "반드시 입력해주세요",
            maxLength: { value: 10, message: "최대 10글자 입력이 가능합니다." },
          }}
        />
        {errors.name?.message ? (
          <p className="error">{errors.name?.message}</p>
        ) : null}
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
      </Row>
      {watch("occupation") === "professor" ? (
        <Row>
          <Label>phone: </Label>
          <ControlInputText<TForm> control={control} name="phone" />
        </Row>
      ) : null}
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </form>
  );
}

export default ReactHookForm;
