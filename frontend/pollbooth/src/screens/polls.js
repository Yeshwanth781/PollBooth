import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon, RepeatClockIcon } from '@chakra-ui/icons'
import Card from '../components/card/card'
import CircleIcon from '../components/circleIcon';
import { Get_Polls } from '../fetchData';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import {
  background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  //deleting members
  //results
  //single vote.
  FormControl,
  FormLabel,
  IconButton,
  Input,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { useSearchParams, useLocation ,useNavigate} from 'react-router-dom';
import DrawerForm from '../components/forms/drawerform';
import { useEffect, useState } from 'react';
import AddForm from '../components/forms/addform';

function Polls() {
  const [polls, set_polls] = useState([]);
  const [params] = useSearchParams();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate=useNavigate();
  const [changed, setchanged] = useState(false);
  const [drawerOpen, setOpen] = useState(false);
  let id,iscreator ;
  if(location.state!==null){
  id= location.state.id;
  iscreator=location.state.iscreator;
  }
  const mclose = () => {
    setchanged(!changed);
    onClose();
  }

  const poll = polls.map((item) => {
    return (
      <Card title={item.pollname} id={item.pollid} isteam={false} iscreator={iscreator}/>
    )
  }
  )
  useEffect(() => {
    if(location.state==null){
      navigate('/')
    }else
    Get_Polls({ set_polls, id: parseInt(location.state.id) });
    console.log("in polls state:",location.state);
  }, [changed])

  return (
    <VStack
      color={'rgb(174, 231, 235)'}
      align={'stretch'}
      flex={1}
      wrap
      pt={10}
      spacing={10}
    >
      <HStack spacing={50} align={'center'} justify={'center'}>
        <Center>
          <Heading>Your Polls</Heading>
        </Center>
        <Button
          left={300}
          bg={'#164fd7'}
          visibility={iscreator?'visible':'hidden'}
          alignSelf={''}
          onClick={onOpen}
        >Create Poll</Button>
        <Button
          left={300}
          bg={'#164fd7'}
          alignSelf={'flex-end'}
          onClick={()=>setOpen(true)}
          visibility={iscreator?'visible':'hidden'}
          leftIcon={<RepeatClockIcon />}
        >Members</Button>
        </HStack >
        <Wrap spacing={10} p={10} overflowY={'auto'}>
          {(poll.length === 0) ?
            (<Heading color={'red'}>No Polls Availiable to vote</Heading>) : poll}
        </Wrap>
        <Modal
          isOpen={isOpen}
          onClose={mclose}
        >
          <ModalOverlay />
          <ModalContent bg={'gray.800'} color={'white'}>
            <ModalHeader>Create Poll</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <AddForm onClose={mclose} id={id} desc='poll' />
            </ModalBody>
          </ModalContent>
        </Modal>

      <Drawer
        isOpen={drawerOpen}
        placement='right'
        onClose={() => setOpen(false)}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent bg={'gray.800'} color={'white'}>
          <DrawerCloseButton />
          <DrawerHeader>Members</DrawerHeader>

          <DrawerBody>
            <DrawerForm id={id}/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
}

export default Polls;