import Zoom from 'react-reveal/Zoom';
import { MdCheckCircle } from 'react-icons/md';

export const FeedbackSubmitted: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <Zoom>
      <div className="flex flex-col items-center pt-16 text-center">
        <MdCheckCircle size="40" className="mb-3 text-green-400" />
        <div className="text-xl font-semibold">{msg}</div>
      </div>
    </Zoom>
  );
};
