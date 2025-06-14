"use client";

import {
  Box,
  Button,
  Input,
  Text,
  Grid,
  Flex,
  Image,
  GridItem,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import domtoimage from "dom-to-image";

const GreetingCard = () => {
  const [name, setName] = useState("");
  const [bgImage, setBgImage] = useState("/1.png"); // Default background
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await domtoimage.toJpeg(cardRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "1.png";
        link.click();
      } catch (error) {
        console.error("Error capturing image", error);
      }
    }
  };

  return (
    <Grid
      gap="1rem"
      padding="0.5rem"
      templateColumns="repeat(2, 1fr)"
      width="full"
    >
      <GridItem colSpan="1">
        <Flex
          flexDirection="column"
          gap="1rem"
          paddingY="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex
            flexDirection="row"
            alignItems="center"
            gap="0.5rem"
            width="full"
            maxWidth="300px"
            justifyContent="space-between"
          >
            <Text>Select Card Design</Text>
            <select
              onChange={(e) => setBgImage(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              <option value="/1.png">Card 1</option>
              <option value="/2.png">Card 2</option>
              <option value="/3.png">Card 3</option>
              <option value="/4.png">Card 4</option>
            </select>
          </Flex>

          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxWidth="300px"
            paddingX="0.5rem"
          />
        </Flex>
      </GridItem>

      <GridItem colSpan="1">
        <Flex>
          <Box
            ref={cardRef}
            height="full"
            maxHeight="90dvh"
            boxShadow="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="0.5rem"
            textAlign="center"
            position="relative"
            maxW="full"
          >
            <Image
              src={bgImage}
              width="full"
              height="full"
              position="relative"
            />
            <Text
              fontSize={{ base: "0.75rem", sm: "1.2rem", md: "1.4rem" }}
              fontWeight="bold"
              color="#195e31"
              position="absolute"
              left="50%"
              bottom="11%"
              transform="translateX(-50%)"
              width={{
                base: "280px",
                md: "500px",
              }}
              textAlign="center"
            >
              {name}
            </Text>
          </Box>

          <Button
            bg="green.500"
            color="white"
            padding="1rem"
            fontSize="1rem"
            fontWeight="600"
            marginTop="1rem"
            onClick={handleDownload}
          >
            Download as Image
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default GreetingCard;
