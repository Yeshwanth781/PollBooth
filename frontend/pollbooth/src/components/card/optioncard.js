import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";


import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button } from '@chakra-ui/react'
export function Pollcard({ title, id, selectedoption,set_selected,votes }) {
    const navigate = useNavigate();
    return (
        <WrapItem
        >
            <HStack
                bg={selectedoption==id?'orange':'twitter'}
                color={'white'}
                p={5}
                width={400}
                spacing={20}
                onClick={() => {set_selected(id)}}
                shadow='md'
                _hover={{ cursor: 'pointer' }}
                align='center'
                justify='space-between'
                borderRadius={5}
            >
                <Heading>{title}</Heading>
                <Button bg={'pink'} borderRadius='10'>
                    {votes}
                </Button>
            </HStack>
        </WrapItem>
    )
}
