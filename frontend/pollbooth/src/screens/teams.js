import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import Card from '../components/card/card'
import CircleIcon from '../components/circleIcon';
import getTeams from '../fetchData';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Get_Teams } from '../fetchData';
import { useEffect, useState } from 'react';
function Teams() {
  const [teams, set_teams] = useState([]);
  const team = teams.map((item) => {
    return (
      <Card title={item.teamname} id={item.teamid} isteam={true}/>
    )
  }
  )
  useEffect(() => {
    Get_Teams({ set_teams, id: 1 });
  }, [])

  const icon = <PhoneIcon />
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
      >Create Team</Button>
      </HStack>
      <Wrap spacing={10} p={10}>
        {team}
      </Wrap>
    </VStack>
  );
}

export default Teams;
