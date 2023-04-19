import { SearchOutlined } from '@ant-design/icons';
import { FloatButton, Result, Select } from 'antd';

import { api } from '~/utils/api';
import { Loading } from '~/components/Loading';
import { useState } from 'react';
import { QueryResult } from '~/components/QueryResult';

const Difference = () => {
  const [wordsPhrasesOrSentences, setWordsPhrasesOrSentences] = useState<
    string[]
  >([]);

  const {
    mutate,
    isLoading,
    data: difference,
  } = api.english.difference.useMutation();

  const handleSubmit = () => {
    mutate({ wordsPhrasesOrSentences });
  };

  return (
    <div className='explanation container'>
      {isLoading && <Loading />}
      {difference && (
        <QueryResult
          query={wordsPhrasesOrSentences.join(', ')}
          response={difference}
        />
      )}

      {!isLoading && !difference && (
        <Result status='404' title='There is nothing to differentiate' />
      )}
      <FloatButton
        description={
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              display: 'flex',
              top: 0,
              bottom: 0,
            }}
          >
            <Select
              size='large'
              mode='tags'
              style={{ flexGrow: 1 }}
              onChange={setWordsPhrasesOrSentences}
              placeholder='Type your text and press enter'
            />

            <div
              style={{
                position: 'absolute',
                right: 0,
                height: 40,
                width: 40,
                borderRadius: '0 5px 5px 0',
                background: 'green',
                display: 'grid',
                placeContent: 'center',
                fontSize: 16,
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={handleSubmit}
            >
              <SearchOutlined />
            </div>
          </div>
        }
        shape='square'
        style={{ width: '80%', bottom: 8, right: '10%' }}
      />
    </div>
  );
};

export default Difference;
