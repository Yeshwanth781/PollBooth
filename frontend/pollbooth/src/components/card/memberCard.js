import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon,DeleteIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Heading, Text, WrapItem, ArrowRightIcon, HStack, Button, IconButton } from '@chakra-ui/react'

export function Membercard({userid}) {
    const navigate = useNavigate();
    return (
            <HStack
                bg={'blackAlpha.400'}
                color={'white'}
                borderLeftWidth={5}
                p={5}
                width={'100%'}
                spacing={20}
                shadow='md'
                align='center'  
                justify='space-between'
                borderRadius={5}
            >
                <Text>{userid}</Text>
                <IconButton
                size={'xs'}
                icon={<DeleteIcon/>}
                colorScheme='blue'
                />
            </HStack>
    )
}