import { Box, Text } from '@chakra-ui/react';
import { FaTable } from 'react-icons/fa';

export function EmptyTable() {
  return (
    <Box
      border='1px solid #EDF2F7'
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='300px'
      color='rgba(0, 0, 0, 0.25)'
      fontSize='14px'
      position='relative'
      _after={{
        content: "''",
        position: 'absolute',
        top: '42px',
        left: 0,
        height: '1px',
        width: '100%',
        background: '#EDF2F7',
      }}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        marginTop='42px'
      >
        <FaTable size='35px' />
        <Text fontWeight={600} fontSize='14px' marginTop='8px'>
          No Data
        </Text>
      </Box>
    </Box>
  );
}
