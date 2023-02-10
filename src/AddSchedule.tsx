import { FC, ReactNode } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface AddScheduleProps {}

export const AddSchedule: FC<AddScheduleProps> = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleSave = () => {
    onClose();
  };

  return (
    <>
      <Button
        colorScheme='green'
        size='lg'
        margin='27px 15px 0 0'
        width='100%'
        minWidth='200px'
        onClick={onOpen}
      >
        Adauga Program
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg='#EDF2F7'>
          <ModalHeader
            fontWeight={900}
            fontSize='15px'
            textTransform='capitalize'
          >
            Adauga Program Saptamanal
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>coming soon</ModalBody>
          <ModalFooter display='flex' justifyContent='flex-end' gap='16px'>
            <Button colorScheme='red' size='sm' onClick={onClose}>
              Inchide
            </Button>
            <Button colorScheme='green' size='sm' onClick={handleSave}>
              Salveaza
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
