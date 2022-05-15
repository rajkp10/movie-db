import React, { useEffect } from "react";
import {
  Heading,
  VStack,
  Badge,
  SimpleGrid,
  Image,
  Text,
  Stack,
  Box,
  HStack,
  Grid,
  Spacer,
  StackDivider,
  Icon,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const NoPoster =
  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

function IndividualMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies: movie, isLoading, error } = useFetch(`&i=${id}`);

  if (error.show) {
    <VStack>
      <Badge p="4" colorScheme="yellow">
        {error.msg}
      </Badge>
    </VStack>;
  }

  const {
    Poster: poster,
    Title: title,
    Genre: genre,
    Rated: rated,
    Runtime: runtime,
    Director: director,
    Writer: writer,
    Actors: actors,
    Plot: plot,
    Released: released,
    imdbRating,
  } = movie;

  useEffect(() => {
    window.location.reload();
  }, [movie]);

  return (
    <Stack m="8" direction="column" justifyContent="center" alignItems="center">
      <Icon
        as={BsArrowLeft}
        ml={{ lg: "13vw" }}
        mb="4"
        w={6}
        h={6}
        alignSelf="flex-start"
        cursor="pointer"
        onClick={() => navigate(-1)}
      />
      <SimpleGrid
        w={{ sm: "90vw", md: "80vw", lg: "70vw" }}
        columns={{ sm: 1, md: 1, lg: 2 }}
        spacing="4"
      >
        <VStack alignItems={{ sm: "center", md: "center", lg: "flex-start" }}>
          <Skeleton isLoaded={!isLoading}>
            <Image
              src={poster === "N/A" ? NoPoster : poster}
              objectFit="cover"
              w="20rem"
              h="30rem"
              borderRadius="lg"
              shadow="0px 5px 7px 0px rgba(0,0,0,0.75)"
            />
          </Skeleton>
        </VStack>
        <VStack
          w="100%"
          spacing="4"
          divider={<StackDivider />}
          alignItems="stretch"
        >
          <Box mb="2">
            <Skeleton isLoaded={!isLoading}>
              <Heading fontWeight="bold">{title}</Heading>
            </Skeleton>
            <SkeletonText isLoaded={!isLoading} noOfLines={4} spacing={4}>
              <HStack textColor="gray.400">
                <Text>{genre}</Text>
                <Spacer />
                <Text>{released}</Text>
              </HStack>
              <HStack textColor="gray.400">
                <Text>{rated}</Text>
                <Spacer />
                <Text>{runtime}</Text>
              </HStack>
              <HStack textColor="gray.400">
                <Text>imdb : {imdbRating}</Text>
                <Icon as={FaStar} color="gold" />
              </HStack>
            </SkeletonText>
          </Box>
          <Box>
            <SkeletonText isLoaded={!isLoading} noOfLines={3} spacing={4}>
              <Grid templateColumns="1fr 2fr" my="2">
                <Text fontWeight="semibold">Writer(s) : </Text>
                <Text>{writer}</Text>
              </Grid>
              <Grid templateColumns="1fr 2fr" my="2">
                <Text fontWeight="semibold">Director(s) : </Text>
                <Text>{director}</Text>
              </Grid>
              <Grid templateColumns="1fr 2fr" my="2">
                <Text fontWeight="semibold">Actors : </Text>
                <Text>{actors}</Text>
              </Grid>
            </SkeletonText>
          </Box>
          <Box>
            <SkeletonText isLoaded={!isLoading} noOfLines={4} spacing={4}>
              <Text fontWeight="semibold" my="2">
                Plot :
              </Text>
              <Text my="2">{plot}</Text>
            </SkeletonText>
          </Box>
          <SkeletonText
            isLoaded={!isLoading}
            h="20px"
            noOfLines={3}
            spacing={4}
          >
            <HStack
              pb="4"
              divider={<StackDivider />}
              justifyContent="space-evenly"
            >
              {isLoading ||
                movie.Ratings.map((rating) => {
                  const { Source: source, Value: value } = rating;
                  return (
                    <VStack key={source}>
                      <Text>{source}</Text>
                      <Text>{value}</Text>
                    </VStack>
                  );
                })}
            </HStack>
          </SkeletonText>
        </VStack>
      </SimpleGrid>
    </Stack>
  );
}

export default IndividualMovie;
