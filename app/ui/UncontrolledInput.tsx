import { useRef } from 'react';
import type { FC } from 'react';

interface UncontrolledInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  value: string;
  type: string;
}

export const UncontrolledInput: FC<UncontrolledInputProps> = ({
  id,
  label,
  value = '',
  type = 'text',
  ...rest
}) => {
  const input = useRef<HTMLInputElement>(null);

  if (input.current) {
    input.current.value = value;
  }

  return (
    <p>
      <label>
        {label}
        <input ref={input} id={id} name={id} type={type} {...rest} />
      </label>
    </p>
  );
};
