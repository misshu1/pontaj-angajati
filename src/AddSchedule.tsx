import { FC, ReactNode } from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';

interface AddScheduleProps {
  children: ReactNode;
}

export const AddSchedule: FC<AddScheduleProps> = ({ children }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleSave = () => {
    onClose();
  };

  return (
    <Popover
      placement='left-start'
      closeOnBlur={false}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent bg='#EDF2F7'>
          <PopoverArrow bg='#EDF2F7' />
          <PopoverHeader
            fontWeight={900}
            fontSize='15px'
            textTransform='capitalize'
          >
            Adauga Program Saptamanal
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>something</PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end' gap='16px'>
            <Button colorScheme='red' size='sm' onClick={onClose}>
              Inchide
            </Button>
            <Button colorScheme='green' size='sm' onClick={handleSave}>
              Salveaza
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
