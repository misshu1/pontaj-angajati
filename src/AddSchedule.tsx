import { FC } from 'react';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

interface AddScheduleProps {}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3182ce',
      contrastText: 'white',
    },
  },
});

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
          <ModalBody>
            <ThemeProvider theme={customTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileTimePicker
                  views={['hours', 'minutes']}
                  format='HH:mm'
                  localeText={{
                    toolbarTitle: 'Alege ora',
                    cancelButtonLabel: 'Anulare',
                  }}
                  minutesStep={5}
                  ampm={false}
                  onAccept={(accept) => console.log(accept)}
                  sx={{
                    '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'inherit',
                    },
                    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: 'var(--chakra-colors-gray-300)',
                      },
                    '& .MuiInputBase-root:focus-visible .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#3182ce',
                      },
                    '& .MuiInputBase-root': {
                      height: 'var(--chakra-sizes-12)',
                      borderRadius: 'var(--chakra-radii-md)',
                    },
                  }}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </ModalBody>
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
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

// <MobileTimePicker
// label={'"minutes" and "seconds"'}
// views={["hours", "minutes"]}
// format="hh:mm"
// ampm={false}
// onChange={(newValue: any) => {
//   console.log(newValue);
// }}
// />
