import { useState } from "react";
import { 
  Box, Button, Input, VStack, Heading, Text, useToast 
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Page redirect karne ke liye

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Button par loading dikhane ke liye

  const navigate = useNavigate();
  const toast = useToast(); // Notification ke liye (Chakra UI ka feature)

  const submitHandler = async () => {
    setLoading(true); // Loading shuru
    if (!email || !password) {
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

    try {
      // 1. API Call (Backend se baat karo)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      // 2. Success! Data ko Local Storage mein save karo
      // JSON.stringify isliye kyunki LocalStorage sirf Strings store kar sakta hai, Object nahi.
      // yeh key value pair main store hoge userinfo key hai and woh data token aur password value hai 
      localStorage.setItem("userInfo", JSON.stringify(data));

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      
      // 3. User ko Notes page par bhej do
      navigate("/mynotes");

    } catch (error) {
      // Agar password galat hai
      toast({
        title: "Error Occured!",
        description: error.response.data.message, // Backend ka error message
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
          <Heading fontSize="2xl">Login</Heading>
          
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
          
          <Button 
            colorScheme="blue" 
            w="100%" 
            onClick={submitHandler}
            isLoading={loading} // Chakra UI ka magic prop
          >
            Login
          </Button>
          
          <Text fontSize="sm">
             New Customer? <a href="/register" style={{color: "blue"}}>Register Here</a>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;