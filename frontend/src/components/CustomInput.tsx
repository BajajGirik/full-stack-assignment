import { Input } from "antd";

type Props = {
  id?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
  placeholder?: string;
};

const CustomInput = ({ id, name, value, onChange, hideLabel, placeholder }: Props) => {
  return (
    <div>
      {hideLabel ? null : <label htmlFor={id}>{name}</label>}
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? "Enter text here"}
        size="large"
      />
    </div>
  );
};

export default CustomInput;
