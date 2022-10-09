import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon, RepeatClockIcon } from '@chakra-ui/icons'
import Card from '../components/card/card'
import CircleIcon from '../components/circleIcon';
import getTeams from '../fetchData';
import { Formik } from 'formik'
import React from 'react';
import { Get_Teams } from '../fetchData';
import AddForm from '../components/forms/addform';
import {
  Modal,
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
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Wrap,
  WrapItem,
  background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import DrawerForm from '../components/forms/drawerform';
import { useSearchParams, useNavigate,useLocation } from 'react-router-dom';

function Teams() {
  const location = useLocation();
  const navigate=useNavigate();
  let id ;
  if(location.state!==null)
  id= location.state.id;
  const [teams, set_teams] = useState([]);
  const [changed, setchanged] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mclose = () => {
    setchanged(!changed);
    onClose();
  }
  const team = teams.map((item) => {
    return (
      <Card title={item.teamname} id={item.teamid} isteam={true} iscreator={(id===item.creator)}/>
    )
  }
  )
  useEffect(() => {
    if(location.state==null){
      navigate('/')
    }
    console.log("In teams", location.state);
    Get_Teams({ set_teams, id });
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
          <Heading>Your Teams</Heading>
        </Center>
        <Button
          left={300}
          bg={'#164fd7'}
          alignSelf={'flex-end'}
          onClick={onOpen}
        >Create Team</Button>
      </HStack>
      <Wrap spacing={10} p={10}>
        {(team.length === 0) ?
          (<Heading color={'red'}>No teams Availiable to vote</Heading>) : team}
      </Wrap>
      <Modal
        isOpen={isOpen}
        onClose={mclose}
      >
        <ModalOverlay />
        <ModalContent bg={'gray.800'} color={'white'}>
          <ModalHeader>Add Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
            <AddForm onClose={mclose} id={location.state.id} desc='Team' />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Teams;
