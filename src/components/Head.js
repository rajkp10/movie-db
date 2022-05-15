import {
  Divider,
  IconButton,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { useGlobalContext } from "./context";

function Head() {
  const { setQuery } = useGlobalContext();
  const [timeoutId, setTimeoutId] = useState();
  const { colorMode, toggleColorMode } = useColorMode();

  const onTextChange = (e) => {
    clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      console.log("API call");
      setQuery(e);
    }, 1000);
    setTimeoutId(newTimeout);
  };

  return (
    <VStack
      w="100%"
      maxW={{ base: "80vw", sm: "60vw", lg: "50vw", xl: "40vw" }}
      m="4"
    >
      <Heading
        bgGradient="linear(to-r,green.300, blue.200, purple.500)"
        bgClip="text"
      >
        Movie Database
      </Heading>
      <Divider py="2" />
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading color="purple.500" fontSize="2xl" mt="8" alignSelf="flex-start">
        Search Movie
      </Heading>
      <InputGroup color="purple.500">
        <InputLeftElement pointerEvents="none" children={<FaSearch />} />
        <Input
          variant="filled"
          placeholder="Movie Name ..."
          fontWeight="bold"
          onChange={(e) => onTextChange(e.target.value)}
        />
      </InputGroup>
    </VStack>
  );
}

export default Head;
