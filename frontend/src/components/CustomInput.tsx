import { Input } from "antd";

type Props = {
  id?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({ id, name, value, onChange }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder="Enter text here"
      />
    </div>
  );
};

export default CustomInput;