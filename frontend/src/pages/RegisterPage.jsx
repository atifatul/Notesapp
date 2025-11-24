import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      navigate("/mynotes");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      // 1. Consistent Gradient Background
      bgGradient="linear(to-br, purple.600, blue.500, teal.300)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={8} // Thoda padding vertical taaki mobile pe kate nahi
    >
      <Box
        // 2. Glassmorphism Card
        bg="whiteAlpha.900"
        backdropFilter="blur(10px)"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        w="100%"
        maxW="450px" // Thoda chouda kiya kyunki fields zyada hain
      >
        <VStack spacing={6}>
          {/* Header */}
          <VStack spacing={2} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
            >
              Create Account
            </Heading>
            <Text fontSize="md" color="gray.500">
              Join us and start organizing your thoughts
            </Text>
          </VStack>

          {/* Form Fields */}
          <VStack spacing={4} w="100%">
            <FormControl>
              <FormLabel ml={1}>Full Name</FormLabel>
              <Input
                variant="filled"
                placeholder="John Doe"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "purple.500" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel ml={1}>Email Address</FormLabel>
              <Input
                variant="filled"
                placeholder="john@example.com"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "purple.500" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel ml={1}>Password</FormLabel>
              <Input
                variant="filled"
                placeholder="********"
                type="password"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "purple.500" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel ml={1}>Confirm Password</FormLabel>
              <Input
                variant="filled"
                placeholder="********"
                type="password"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "purple.500" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </VStack>

          {/* 3. Gradient Button */}
          <Button
            bgGradient="linear(to-r, blue.500, purple.600)"
            color="white"
            size="lg"
            w="100%"
            borderRadius="full"
            _hover={{
              bgGradient: "linear(to-r, blue.600, purple.700)",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _active={{ transform: "translateY(0)" }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Register
          </Button>

          {/* Footer Link */}
          <Text fontSize="sm" color="gray.600">
            Already have an account?{" "}
            <Text
              as={RouterLink}
              to="/login"
              color="purple.600"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Login Here
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegisterPage;