import ControlInputText from "component/ControlInputText";
import { FieldValues, useForm } from "react-hook-form";
import { Row } from "style";

interface TForm {
  occupation: string;
  id: string;
  name: string;
  pwd: string;
  email: string;
}

function ReactHookForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();
  return (
    <form>
      <Row>
        <ControlInputText<TForm>
          control={control}
          name="id"
          rules={{
            required: "반드시 입력해주세요",
            max: { value: 10, message: "최대 10글자 입력이 가능합니다." },
          }}
        />
      </Row>
    </form>
  );
}

export default ReactHookForm;
