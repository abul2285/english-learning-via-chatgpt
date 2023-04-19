import { Button } from 'antd';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <div className='bg-gray-100'>
        <section className='py-8'>
          <div className='container mx-auto'>
            <h2 className='mb-4 text-center text-2xl font-bold'>Translation</h2>
            <p className='text-center text-gray-600'>
              Translate Bengali to English and vice versa.
            </p>
            {/* Add additional content or components related to translation */}
          </div>
        </section>

        <section className='bg-gray-200 py-8'>
          <div className='container mx-auto'>
            <h2 className='mb-4 text-center text-2xl font-bold'>Mistakes</h2>
            <p className='text-center text-gray-600'>
              Identify and correct common grammatical mistakes.
            </p>
            {/* Add additional content or components related to mistakes */}
          </div>
        </section>

        <section className='py-8'>
          <div className='container mx-auto'>
            <h2 className='mb-4 text-center text-2xl font-bold'>Lessons</h2>
            <p className='text-center text-gray-600'>
              Learn English through structured lessons and exercises.
            </p>
            {/* Add additional content or components related to lessons */}
          </div>
          <Button type='primary'>Hello</Button>
        </section>
      </div>
    </>
  );
};

export default HomePage;
