import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useRef } from 'react';
import { RecalledByUser } from '../CurrentMuseum';

function DelBtn({
  id,
  handle,
  btnText,
  trigger,
  toast,
}: {
  handle?: () => void;
  btnText: string;
  id?: RecalledByUser;
  trigger?: Dispatch<SetStateAction<boolean>>;
  toast?: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteUserRecall = () => {
    axios.delete(`http://127.0.0.1:3000/api/recall`, {
      data: {
        userId: id?.Recall.userId,
        museumId: id?.Recall.museumId,
      },
    });
    onClose();
    trigger && trigger((pre) => !pre);
    toast &&
      toast({
        title: `комментарий удален`,
        status: 'success',
        isClosable: true,
        duration: 1000,
        position: 'bottom-right',
      });
  };

  return (
    <>
      <Button width="200px" colorScheme="red" onClick={onOpen}>
        {btnText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {btnText}
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы уверены? Это действие необратимо
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Отмена
              </Button>
              <Button
                colorScheme="red"
                onClick={handle || handleDeleteUserRecall}
                ml={3}
              >
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DelBtn;
