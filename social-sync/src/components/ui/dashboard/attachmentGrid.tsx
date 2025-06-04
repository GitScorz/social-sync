import React from 'react';

interface AttachmentGridProps {
  attachments: string[];
}

export default function AttachmentGrid({ attachments }: AttachmentGridProps) {
  const getBorderRadius = (index: number, length: number) => {
    if (length === 1) {
      return 'rounded-xl';
    } else if (length === 2) {
      if (index === 0) return 'rounded-tl-xl rounded-bl-xl';
      if (index === 1) return 'rounded-tr-xl rounded-br-xl';
    } else if (length === 3) {
      if (index === 0) return 'rounded-tl-xl rounded-bl-xl';
      if (index === 1) return 'rounded-tr-xl';
      if (index === 2) return 'rounded-br-xl';
    } else if (length === 4) {
      if (index === 0) return 'rounded-tl-xl';
      if (index === 1) return 'rounded-tr-xl';
      if (index === 2) return 'rounded-bl-xl';
      if (index === 3) return 'rounded-br-xl';
    }

    return '';
  };

  return (
    <div
      className='grid gap-1 h-full'
      style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      {attachments.map((image, index) => (
        <div
          key={index}
          className={`relative h-full overflow-hidden ${getBorderRadius(
            index,
            attachments.length
          )}`}
          style={{
            gridRow:
              attachments.length === 3 && index === 0 ? 'span 2' : undefined,
          }}
        >
          <img
            src={image}
            alt={`Attachment ${index + 1}`}
            draggable={false}
            className='w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-105 aspect-square'
          />
        </div>
      ))}
    </div>
  );
}
