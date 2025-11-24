import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Divider,
  Input,
  Button,
  Textarea,
  HStack,
  SimpleGrid, // Grid layout ke liye
  Container,
  Badge,
  Flex,
  useToast,
} from "@chakra-ui/react";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();

  // --- LOGIC SAME RAHEGA (Start) ---
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchNotes = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      try {
        const { data } = await axios.get("/api/notes", config);
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    try {
      if (editId) {
        const { data } = await axios.put(
          `/api/notes/${editId}`,
          { title, content, category },
          config
        );
        const updatedNotes = notes.map((note) =>
          note._id === editId ? data : note
        );
        setNotes(updatedNotes);
        setEditId(null);
        toast({ title: "Note Updated", status: "success", duration: 2000 });
      } else {
        const { data } = await axios.post(
          "/api/notes",
          { title, content, category },
          config
        );
        setNotes([...notes, data]);
        toast({ title: "Note Added", status: "success", duration: 2000 });
      }
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`/api/notes/${id}`, config);
        const filteredNotes = notes.filter((note) => note._id !== id);
        setNotes(filteredNotes);
        toast({ title: "Note Deleted", status: "info", duration: 2000 });
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const editHandler = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    // User ko scroll karke form par le aao
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // --- LOGIC SAME RAHEGA (End) ---

  return (
    <Box
      minH="100vh"
      // 1. Theme Gradient Background
      bgGradient="linear(to-br, purple.600, blue.500, teal.300)"
      py={10}
      px={4}
    >
      <Container maxW="6xl">
        {" "}
        {/* Container taaki content centre mein rahe */}
        {/* --- HEADER --- */}
        <Flex
          justify="space-between"
          align="center"
          mb={10}
          bg="whiteAlpha.200"
          p={4}
          borderRadius="xl"
          backdropFilter="blur(5px)"
        >
          <Heading color="white" size="lg">
            {user ? `👋 Hi, ${user.name.split(" ")[0]}` : "My Notes"}
          </Heading>
          <Button
            colorScheme="red"
            variant="solid"
            size="sm"
            onClick={logoutHandler}
            _hover={{ bg: "red.600", transform: "scale(1.05)" }}
          >
            Logout
          </Button>
        </Flex>
        {/* --- CREATE/EDIT FORM (Glassmorphism) --- */}
        <Box
          w="100%"
          maxW="600px"
          mx="auto"
          mb={12}
          p={6}
          bg="whiteAlpha.900" // Almost white
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          boxShadow="2xl"
        >
          <Heading size="md" mb={4} textAlign="center" color="gray.700">
            {editId ? "Update Note" : "Create a New Note"}
          </Heading>
          <form onSubmit={submitHandler}>
            <VStack spacing={3}>
              <Input
                variant="filled"
                bg="gray.50"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="lg"
                fontWeight="bold"
                _focus={{ bg: "white", borderColor: "purple.500" }}
              />
              <Textarea
                variant="filled"
                bg="gray.50"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                size="lg"
                rows={3}
                _focus={{ bg: "white", borderColor: "purple.500" }}
              />
              <Input
                variant="filled"
                bg="gray.50"
                placeholder="Category (e.g. Work, Ideas)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                _focus={{ bg: "white", borderColor: "purple.500" }}
              />
              <Button
                bgGradient={
                  editId
                    ? "linear(to-r, orange.400, red.400)"
                    : "linear(to-r, blue.500, purple.600)"
                }
                color="white"
                type="submit"
                w="full"
                size="lg"
                borderRadius="full"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                {editId ? "Update Note" : "Add Note"}
              </Button>
            </VStack>
          </form>
        </Box>
        <Divider mb={8} borderColor="whiteAlpha.400" />
        {/* --- NOTES GRID (Masonry Style) --- */}
        {/* SimpleGrid automatically columns manage karega */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {notes.map((note) => (
            <Card
              key={note._id}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.2s" // Smooth animation
              _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }} // Hawa mein uthega
              overflow="hidden"
            >
              {/* Colored Top Border for visual flair */}
              <Box h="6px" bgGradient="linear(to-r, purple.400, blue.400)" />

              <CardBody>
                <HStack justify="space-between" mb={3}>
                  <Badge
                    colorScheme="purple"
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="0.8em"
                  >
                    {note.category}
                  </Badge>

                  {/* Action Buttons */}
                  <HStack spacing={2}>
                    <Button
                      size="xs"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => editHandler(note)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </HStack>

                <Heading size="md" mb={2} color="gray.800">
                  {note.title}
                </Heading>

                <Text color="gray.600" noOfLines={4}>
                  {" "}
                  {/* 4 lines ke baad ... aa jayega */}
                  {note.content}
                </Text>

                <Text fontSize="xs" color="gray.400" mt={4} textAlign="right">
                  {/* Date dikhane ke liye (Optional) */}
                  {new Date(note.createdAt).toLocaleDateString()}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
        {/* Agar koi note nahi hai toh */}
        {notes.length === 0 && (
          <Text textAlign="center" color="whiteAlpha.800" fontSize="xl" mt={10}>
            No notes found. Create one above! 📝
          </Text>
        )}
      </Container>
    </Box>
  );
};

export default MyNotes;
