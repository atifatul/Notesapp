import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Link use karte hain page change karne ke liye

const HomePage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bg="blue.500"
    >
      <VStack spacing={8} bg="white" p={10} borderRadius="lg" boxShadow="xl">
        <Heading>Welcome to Notes App</Heading>
        <Text>Apne notes ko secure rakhein cloud par.</Text>
        <Box display="flex" gap={4}>
          <Link to="/login">
            <Button colorScheme="blue">Login</Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="green">Signup</Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default HomePage;
