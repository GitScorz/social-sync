import { Hashtag } from '@/types/auth';
import React from 'react';

interface HashtagsAnalysisProps {
  analysis: Hashtag[];
}

const HashtagsAnalysis: React.FC<HashtagsAnalysisProps> = ({ analysis }) => {
  return (
    <div className='bg-black bg-opacity-25 p-4 rounded-lg'>
      <ul style={{ listStyle: "inside"}}>
        {analysis.map((a, key) => (
          <li key={key}>{a.hashtag}</li>
        ))}
      </ul>
    </div>
  );
};

export default HashtagsAnalysis;
