import { Result } from 'antd';
import { useState } from 'react';

import { api } from '~/utils/api';
import { Loading } from '~/components/Loading';
import { QueryInput } from '~/components/QueryInput';
import { QueryResult } from '~/components/QueryResult';

const Explanation = () => {
  const [word, setWord] = useState('');
  const {
    mutate,
    data: correction,
    isLoading,
  } = api.english.correction.useMutation();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' || !word) return;
    mutate({ word });
    setWord(word);
  };

  return (
    <div className='explanation container'>
      {isLoading && <Loading />}
      {correction && <QueryResult query={word} response={correction} />}

      {!isLoading && !correction && (
        <Result
          status='404'
          title='There is no world or phrase to correction'
        />
      )}
      <QueryInput handleKeyDown={handleKeyDown} handleOnChange={setWord} />
    </div>
  );
};

export default Explanation;
