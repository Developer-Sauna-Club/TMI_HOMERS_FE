import { v4 } from 'uuid';
import Box from './Box';

type ParagraphProps = {
  line?: number;
  height?: number;
};

const Paragraph = ({ line = 2, height }: ParagraphProps) => {
  return (
    <div className="w-full">
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box height={height} key={v4()} />
        ) : (
          <Box height={height} width={60} key={v4()} />
        ),
      )}
    </div>
  );
};

export default Paragraph;
