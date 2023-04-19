import { Result } from 'antd';
import React, { useState } from 'react';

import { api } from '~/utils/api';
import { Loading } from '~/components/Loading';
import { QueryInput } from '~/components/QueryInput';
import { QueryResult } from '~/components/QueryResult';

const Translation = () => {
  const [sentence, setSentence] = useState('');
  const {
    mutate,
    isLoading,
    data: translation,
  } = api.english.translation.useMutation();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' || !sentence) return;
    mutate({ sentence });
  };
  return (
    <div className='explanation container'>
      {isLoading && <Loading />}
      {translation && <QueryResult query={sentence} response={translation} />}

      {!isLoading && !translation && (
        <Result status='404' title='There is no sentence to translate' />
      )}
      <QueryInput handleKeyDown={handleKeyDown} handleOnChange={setSentence} />
    </div>
  );
};

export default Translation;
