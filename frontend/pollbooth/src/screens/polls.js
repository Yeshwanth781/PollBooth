import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import Card from '../components/card/card'
import CircleIcon from '../components/circleIcon';
import { Get_Polls } from '../fetchData';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input, } from '@chakra-ui/react'
import { Formik } from 'formik'
import { useSearchParams,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddForm from '../components/forms/addform';

function Polls() {
  const [polls, set_polls] = useState([]);
  const [params]=useSearchParams();
    const location=useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure()
  const id=location.state.id;
  const poll = polls.map((item) => {
    return (
      <Card title={item.pollname} id={item.pollid} isteam={false}/>
    )
  } 
  )
  useEffect(() => {
    Get_Polls({set_polls, id: parseInt(location.state.id) });
  }, [])
 
  return (
    <VStack
      color={'rgb(174, 231, 235)'}
      align={'stretch'}
      flex={1}
      wrap
      pt={10}
      spacing={10}
    >
      <Center>
        <Heading>Your Polls</Heading>
      </Center>
      <Button
      pos={'relative'}
      width={20}
      bg={'#164fd7'}
      left={'80vmax'}
      bottom={20}
      onClick={onOpen}
      >Create</Button>
      <Wrap spacing={10} p={10} overflowY={'auto'}>
        {poll}
      </Wrap>
      <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg={'gray.800'} color={'white'}>
                    <ModalHeader>Create Poll</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                    <AddForm onClose={onClose} id={id} desc='poll'/>
                    </ModalBody>
                </ModalContent>
            </Modal>
    </VStack>
  );
}

export default Polls;
