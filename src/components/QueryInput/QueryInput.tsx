import { FloatButton, Input } from 'antd';

type QueryInputProps = {
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleOnChange: (value: string) => void;
};

export const QueryInput = ({
  handleKeyDown,
  handleOnChange,
}: QueryInputProps) => {
  return (
    <>
      <FloatButton
        description={
          <Input
            type='text'
            size='large'
            onKeyDown={handleKeyDown}
            placeholder='Type your text and press enter'
            style={{ position: 'absolute', left: 0, right: 0 }}
            onChange={(event) => handleOnChange(event.target.value)}
          />
        }
        shape='square'
        style={{ width: '80%', bottom: 8, right: '10%' }}
      />
    </>
  );
};
