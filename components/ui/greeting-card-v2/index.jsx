"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Input,
  Button,
  Grid,
  GridItem,
  Flex,
  Field,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Card1 from "../card-1";
import Card2 from "../card-2";
import Card3 from "../card-3";
import Card4 from "../card-4";

const GreetingCardV2 = () => {
  const [name, setName] = useState("Your Name");
  const [design, setDesign] = useState("1");
  const svgRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(svgRef.current);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `greeting-card-design-${design}.png`;
    link.click();
  };

  const renderSVG = () => {
    switch (design) {
      case "1":
        return <Card1 name={name} />;
      case "2":
        return <Card2 name={name} />;
      case "3":
        return <Card3 name={name} />;
      case "4":
        return <Card4 name={name} />;
      default:
        return null;
    }
  };

  return (
    <Grid
      templateColumns="repeat(8, 1fr)"
      gap="1rem"
      padding="0"
      height="full"
      background="white"
      width="full"
    >
      <GridItem colSpan={{ base: "8", lg: "2" }} background="gray.100">
        <Flex
          width="full"
          height="full"
          minHeight={{ base: "unset", lg: "100dvh" }}
          flexDirection="column"
          padding="1rem"
          gap="2rem"
        >
          <Field.Root>
            <Field.Label color="gray.900">Enter your name</Field.Label>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="full"
              color="gray.800"
              padding="1rem 0.5rem"
              borderRadius="0.5rem"
              fontSize="1rem"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label color="gray.900">Select the design</Field.Label>
            <select
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: "0.75rem 0.5rem",
                border: "1px solid #333",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                color: "#333",
              }}
              value={design}
              onChange={(e) => setDesign(e.target.value)}
            >
              <option value="1">Design 1</option>
              <option value="2">Design 2</option>
              <option value="3">Design 3</option>
              <option value="4">Design 4</option>
            </select>
          </Field.Root>
          <Button
            colorScheme="teal"
            marginTop="auto"
            backgroundColor="green"
            fontWeight="semibold"
            padding="1rem 0.5rem"
            color="white"
            onClick={handleDownload}
          >
            Download as Image
          </Button>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: "8", lg: "6" }} height="full">
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          width="full"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          height="full"
          gap="2rem"
        >
          <Box
            ref={svgRef}
            bg="white"
            borderRadius="0.5rem"
            overflow="hidden"
            height="full"
          >
            {renderSVG()}
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default GreetingCardV2;
