import { useState } from 'react';

import { api } from '~/utils/api';
import { Loading } from '~/components/Loading';
import { QueryInput } from '~/components/QueryInput';
import { QueryTitle } from '~/components/QueryResult';
import { Card, Col, Result, Row } from 'antd';

const MistakesPage = () => {
  const [sentence, setSentence] = useState('');
  const { mutate, data, isLoading } = api.english.convert.useMutation({
    onMutate({ value }) {
      setSentence(value);
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' || !sentence) return;

    mutate({ value: sentence });
    setSentence('');
  };

  return (
    <div className='container'>
      {isLoading && <Loading />}
      {sentence && <QueryTitle query={sentence} />}
      {!isLoading && !sentence && (
        <Result status='404' title='There is nothing to explain' />
      )}
      <Row gutter={[24, 24]} className='mistakes' justify='center'>
        {data?.map(({ type, error }, index) => (
          <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} span={20}>
            <Card style={{ height: '100%' }}>
              <Card.Meta title={type} description={error} />
            </Card>
          </Col>
        ))}
      </Row>

      <QueryInput handleKeyDown={handleKeyDown} handleOnChange={setSentence} />
    </div>
  );
};

export default MistakesPage;
