import React from "react";
import {
  VStack,
  Image,
  Text,
  SimpleGrid,
  Box,
  Badge,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const NoPoster =
  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

function MovieList() {
  const { movies, isLoading, error } = useGlobalContext();

  if (error.show) {
    return (
      <Badge p="4" colorScheme="yellow">
        {error.msg}
      </Badge>
    );
  }

  return (
    <SimpleGrid w="80vw" py="5" minChildWidth="15rem" spacing="2">
      {movies.map((movie) => {
        const { imdbID, Poster: poster, Title: title, Year: year } = movie;
        return (
          <VStack key={imdbID} my="4">
            <Link to={`/movies/${imdbID}`}>
              <Box
                borderRadius="xl"
                boxShadow="0px 5px 7px 0px rgba(0,0,0,0.75)"
                overflow="hidden"
              >
                <Skeleton isLoaded={!isLoading}>
                  <Image
                    src={poster === "N/A" ? NoPoster : poster}
                    h="20rem"
                    w="15rem"
                    shadow="outline"
                  />
                </Skeleton>
                <Box p="2" w="15rem" alignSelf="center">
                  <SkeletonText noOfLines={2} isLoaded={!isLoading}>
                    <Text fontSize="lg" fontWeight="bold">
                      {title}
                    </Text>
                    <Text fontSize="sm">{year}</Text>
                  </SkeletonText>
                </Box>
              </Box>
            </Link>
          </VStack>
        );
      })}
    </SimpleGrid>
  );
}

export default MovieList;
