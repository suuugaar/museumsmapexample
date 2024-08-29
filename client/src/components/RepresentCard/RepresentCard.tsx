import {
  Box,
  Button,
  Heading,
  Highlight,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import Stepper from '../Stepper/Stepper';
import { useState } from 'react';

function RepresentCard() {
  const [content, setContent] = useState(0);

  const hadlerCarusel = () => {
    setContent(content < 2 ? content + 1 : 0);
  };

  return (
    <>
      <Box p={5} w={600}>
        <Heading as="h2" size="xl" noOfLines={1}>
          Представляем вам
        </Heading>
        <Heading as="h2" size="xl" noOfLines={1}>
          проект{' '}
          <Highlight query='"Музейная карта"' styles={{ color: '#16af8d' }}>
            "Музейная карта"
          </Highlight>
        </Heading>
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Stepper step={content} />
              {content === 0 && (
                <Stack
                  minW={'100%'}
                  maxW={'100%'}
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                >
                  <Text fontSize="2xl">Простота использования</Text>
                  <Text fontSize="2xl">
                    Посещение любого музея из списка без необходимости стоять
                    в очереди.
                  </Text>
                  <Text fontSize="2xl">
                    Информация о более чем 30 музеях и новости о проводимых событиях
                  </Text>
                </Stack>
              )}
              {content === 1 && (
                <Stack
                  minW={'100%'}
                  maxW={'100%'}
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                >
                  <Text fontSize="2xl">Срок действия карты - один год</Text>
                  <Text fontSize="2xl">
                    Предъявите карту на входе или отсканируйте QR-код находясь в музее
                  </Text>
                  <Text fontSize="2xl">Список доступных музеев постоянно увеличивается</Text>
                </Stack>
              )}
              {content === 2 && (
                <Stack
                  minW={'100%'}
                  maxW={'100%'}
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                >
                  <Text fontSize="2xl">Можно оформить физическую карту</Text>
                  <Text fontSize="2xl">
                    Вы сможете посетить музеи о которых ранее не слышали увеличивая свой кругозор
                  </Text>
                  <Text fontSize="2xl">
                    Читайте отзывы перед посещением музея и оставляйте свои
                  </Text>
                </Stack>
              )}
          <Button onClick={hadlerCarusel}> &gt;&gt;&gt; </Button>
        </Stack>
      </Box>
    </>
  );
}

export default RepresentCard;
