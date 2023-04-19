import { Row, Space, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';

const { Title } = Typography;

type QueryResultType = {
  query: string;
  response: string;
};

export const QueryResult = ({ query, response }: QueryResultType) => {
  return (
    <>
      <QueryTitle query={query} />
      <ReactMarkdown className='markdown-preview'>{response}</ReactMarkdown>
    </>
  );
};

export const QueryTitle = ({ query }: { query: string }) => {
  return (
    <Row justify='center'>
      <Space direction='vertical' size='large'>
        <span />
        <Title level={2} code type='success'>
          {query}
        </Title>
      </Space>
    </Row>
  );
};
