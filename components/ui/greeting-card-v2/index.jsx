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

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const GreetingCardV2 = () => {
  const [name, setName] = useState("Your Name");
  const [design, setDesign] = useState("1");
  const svgRef = useRef();

  const handleDownload = () => {
    const canvas = document.querySelector("canvas"); // assumes one card on screen
    if (!canvas) return;

    // iOS Safari workaround
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        // Optional alert to guide the user
        alert("Image will open in a new tab. Long-press to save it.");
        window.open(url, "_blank");
      }, "image/png");
    } else {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `greeting-card-design-${design}.png`;
      link.click();
    }
  };

  const renderSVG = () => {
    switch (design) {
      case "1":
        return <Card1 name={name} />;
      case "2":
        return <Card2 name={name} />;
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
          height="full"
        >
          <Box
            ref={svgRef}
            bg="white"
            overflow="hidden"
            border="none"
            height="full"
            maxHeight="90dvh"
            width="auto"
          >
            {renderSVG()}
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default GreetingCardV2;
