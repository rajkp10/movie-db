import React from "react";
import Head from "./components/Head";
import MovieList from "./components/MovieList";
import { Divider, VStack } from "@chakra-ui/react";

function Home() {
  return (
    <VStack p={4}>
      <Head />
      <Divider maxW="80vw" />
      <MovieList />
    </VStack>
  );
}

export default Home;
