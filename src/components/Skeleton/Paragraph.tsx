import Box from './Box';

type ParagraphProps = {
  line?: number;
};

const Paragraph = ({ line = 3 }: ParagraphProps) => {
  return (
    <div>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? <Box key={index} /> : <Box width={25} key={index} />,
      )}
    </div>
  );
};

export default Paragraph;
