import { useState } from "react";
import { 
  Box, Button, Input, VStack, Heading, Text, useToast 
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Link import kiya

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
    
    // 1. Validation: Kya fields khali hain?
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

    // 2. Validation: Kya passwords match kar rahe hain?
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

      // 3. API Call (Register)
      // Note: Hum 'pic' nahi bhej rahe, backend default laga dega.
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );

      // 4. Success! Token save karo aur andar bhejo
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
        // Backend se jo error aayega (eg: User already exists) wo yahan dikhega
        description: error.response.data.message, 
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.100">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="100%" maxW="400px">
        <VStack spacing={4}>
          <Heading fontSize="2xl">Sign Up</Heading>
          
          <Input 
            placeholder="Enter Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <Input 
            placeholder="Confirm Password" 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Button 
            colorScheme="green" 
            w="100%" 
            onClick={submitHandler}
            isLoading={loading}
          >
            Register
          </Button>
          
          <Text fontSize="sm">
             Already have an account? <Link to="/login" style={{color: "blue"}}>Login Here</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegisterPage;