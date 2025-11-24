import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Agar icons chahiye toh install kar lena, warna emoji use kar rahe hain abhi ke liye
// Modern UI ke liye 'Hero' section banayenge

const HomePage = () => {
  return (
    <Box
      minH="100vh"
      // 1. Trendy Gradient Background (Purple to Blue)
      bgGradient="linear(to-br, purple.600, blue.500, teal.300)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      {/* 2. Glassmorphism Card (Sheeshe jaisa effect) */}
      <VStack
        spacing={8}
        bg="whiteAlpha.900" // Thoda sa transparent white
        backdropFilter="blur(10px)" // Peeche ka dhundhla dikhega
        p={{ base: 8, md: 12 }} // Responsive padding
        borderRadius="2xl" // Gol kone
        boxShadow="2xl"
        maxW="lg"
        w="100%"
        textAlign="center"
      >
        {/* Logo ya Icon */}
        <Text fontSize="6xl">📝</Text>

        <VStack spacing={3}>
          {/* 3. Gradient Text for Heading */}
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, blue.600, purple.600)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Notes App
          </Heading>

          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            Capture your thoughts, ideas, and plans. <br />
            Secure. Fast. Accessible everywhere.
          </Text>
        </VStack>

        {/* 4. Modern Pill Buttons */}
        <HStack spacing={4} w="100%">
          <Link to="/login" style={{ width: "100%" }}>
            <Button
              w="100%"
              colorScheme="blue"
              size="lg"
              borderRadius="full" // Pill shape
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }} // Hawa mein uthne wala animation
            >
              Login
            </Button>
          </Link>

          <Link to="/register" style={{ width: "100%" }}>
            <Button
              w="100%"
              variant="outline"
              colorScheme="blue"
              size="lg"
              borderRadius="full"
              borderWidth="2px"
              _hover={{ bg: "blue.50", transform: "translateY(-2px)" }}
            >
              Sign Up
            </Button>
          </Link>
        </HStack>

        <Text fontSize="xs" color="gray.400" mt={4}>
          © 2025 MERN Project. Built with ❤️ by Atif.
        </Text>
      </VStack>
    </Box>
  );
};

export default HomePage;
