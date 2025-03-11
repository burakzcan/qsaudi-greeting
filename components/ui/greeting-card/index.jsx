"use client";

import { Box, Button, Input, Text, VStack, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";
import domtoimage from "dom-to-image";

const GreetingCard = () => {
  const [name, setName] = useState("");
  const [bgImage, setBgImage] = useState("/greeting-card.png"); // Default background
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await domtoimage.toJpeg(cardRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "greeting-card.jpg";
        link.click();
      } catch (error) {
        console.error("Error capturing image", error);
      }
    }
  };

  return (
    <VStack spacing={4} p={6} align="center">
      <Flex
        flexDirection="row"
        width="full"
        paddingY="1rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flexDirection="row" alignItems="center" gap="0.5rem">
          <Text>Select Card Design</Text>
          <select
            onChange={(e) => setBgImage(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <option value="/greeting-card.png">Card 1</option>
            <option value="/greeting-card-2.png">Card 2</option>
            <option value="/greeting-card-3.png">Card 3</option>
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

      <Box
        ref={cardRef}
        width="1080px"
        height="1080px"
        backgroundImage={`url(${bgImage})`}
        backgroundSize="contain"
        borderRadius="lg"
        boxShadow="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
        textAlign="center"
        position="relative"
      >
        <Text
          fontSize="2rem"
          fontWeight="bold"
          color="#195e31"
          position="absolute"
          left="50%"
          bottom="136px"
          transform="translateX(-50%)"
          width="500px"
          textAlign="center"
        >
          {name}
        </Text>
      </Box>

      <Button bg="green.500" color="white" padding="1rem" fontSize="1rem" fontWeight="600" marginTop="1rem" onClick={handleDownload}>
        Download as Image
      </Button>
    </VStack>
  );
};

export default GreetingCard;
