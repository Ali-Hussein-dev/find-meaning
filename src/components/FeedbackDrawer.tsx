import * as React from 'react';
import { nanoid } from 'nanoid';
import store from 'store2';
import { isMobile } from 'react-device-detect';
import { fetcherPost } from 'src/utils';
import { useQuery } from 'react-query';
import { CondComp, FeedbackSubmitted } from '@/components/index';
import { MdClear, MdSend } from 'react-icons/md';
import {
  Input,
  Textarea,
  Stack,
  useDisclosure,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';

//--------------------------------------setIdentiefer
(function () {
  if (!store.get('identiefer')) {
    store.set('identiefer', { _id: nanoid(), feedbackCount: 0 });
  }
  return;
})();
//--------------------------------------updateIdentieferProperty
const updateIdentieferProperty = (
  identieferObj: {
    _id: string;
    feedbackCount: number;
  },
  keyValue,
) => {
  store.set('identiefer', { ...identieferObj, ...keyValue });
};
const feedbackCount = store.get('identiefer').feedbackCount;
//=======================FeedbackSubmitted

//=======================FeedbackDrawer
export const FeedbackDrawer: React.FC = () => {
  //--------------------------------------hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [textareaValue, setTextareaValue] = React.useState('');
  const [enabledFetching, setEnabledFetching] = React.useState(false);
  const { status } = useQuery(
    'feedback',
    () =>
      fetcherPost('api/feedback', {
        _id: store.get('identiefer')._id,
        feedback: {
          userName: nameValue,
          email: emailValue,
          feedback: textareaValue,
          createdAt: new Date(),
          stars: undefined,
        },
      }),
    {
      enabled: enabledFetching,
      staleTime: Infinity,
      onSuccess: () => {
        updateIdentieferProperty(store.get('identiefer'), {
          feedbackCount: store.get('identiefer').feedbackCount + 1,
        });
      },
    },
  );
  //--------------------------------------functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnabledFetching(true);
  };
  //======================================return
  return (
    feedbackCount < 3 && (
      <div className="w-full mb-3 text-center">
        <Drawer
          isOpen={isOpen}
          placement={isMobile ? 'bottom' : 'right'}
          onClose={onClose}
        >
          <DrawerOverlay>
            <DrawerContent data-testid="feedback-container" bg={''}>
              <DrawerHeader className="bg-lightBlue-800">
                <div className="">
                  <h2 className="text-base text-lightBlue-300">Feedback</h2>
                  <h2 className="text-xl font-normal text-blueGray-50">
                    Your feedback is valuable to us
                  </h2>
                </div>
              </DrawerHeader>
              <DrawerBody className="bg-blueGray-50 text-blueGray-700">
                <form onSubmit={handleSubmit}>
                  <CondComp
                    baseCond={status !== 'success'}
                    fallback={
                      <FeedbackSubmitted msg={'Thank you for your feedback!'} />
                    }
                    className="py-3 "
                  >
                    <Stack spacing={4}>
                      <label htmlFor="name">
                        <Input
                          isRequired
                          id="name"
                          variant="flushed"
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                          type="text"
                          placeholder="name*"
                        />
                      </label>
                      <label htmlFor="email">
                        <Input
                          id="email"
                          isRequired
                          variant="flushed"
                          type="email"
                          placeholder="email*"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                        />
                      </label>
                      <label htmlFor="feedback-text">
                        <Textarea
                          id="feedback-text"
                          variant="flushed"
                          isRequired
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                          placeholder="e.g. ask for a nice feature*"
                        />
                      </label>
                    </Stack>
                  </CondComp>
                </form>
              </DrawerBody>
              <DrawerFooter className="flex justify-between w-full gap-x-1 bg-blueGray-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn flex-grow h-8 rounded-lg press-effect focus:ring-2 center text-blueGray-600 ring-yellow-600"
                >
                  <span className="center gap-x-2">
                    <MdClear size="20" />
                    Cancel
                  </span>
                </button>
                {status !== 'success' && (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    name="submit-feedback"
                    data-testid="submit-feedback"
                    className="btn flex-grow h-8 text-white rounded-lg bg-lightBlue-600 disabled:bg-blueGray-200 disabled:text-blueGray-400 disabled:cursor-not-allowed focus:ring-2 center gap-x-1 ring-yellow-600"
                    disabled={
                      !(!!emailValue && !!textareaValue && !!nameValue) ||
                      status === 'loading'
                    }
                  >
                    {status === 'loading' ? (
                      <Spinner size="sm" />
                    ) : (
                      <span className="center gap-x-2">
                        <MdSend size="15" />
                        Send
                      </span>
                    )}
                  </button>
                )}
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <button
          type="button"
          onClick={onOpen}
          className="p-1 font-semibold underline rounded focus:outline-none text-blueGray-300 focus:ring-2 ring-lightBlue-500 hover:text-lightBlue-500"
        >
          Was this helpful?
        </button>
      </div>
    )
  );
};
