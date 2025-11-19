import React, { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";
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
} from "@chakra-ui/react";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("/api/notes");
      console.log(data);
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    try {
      const { data } = await axios.post("/api/notes", {
        title,
        content,
        category,
      });
      setNotes([...notes, data]);

      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      // User se confirm karo
      try {
        // Backend call: URL mein ID jod kar bheji
        await axios.delete(`/api/notes/${id}`);

        // UI Update: Jo delete hua, usse filter karke hata do
        const filteredNotes = notes.filter((note) => note._id !== id);
        setNotes(filteredNotes);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };
  return (
    <>
      <Box p={5} bg="gray.50" minH="100vh">
        <Heading mb={6} textAlign="center" color="blue.600">
          My Notes App
        </Heading>

        {/* --- FORM START --- */}
        <Box
          w="500px"
          mx="auto"
          mb={10}
          p={5}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
        >
          <form onSubmit={submitHandler}>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                placeholder="Category (e.g., Work, Personal)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button colorScheme="blue" type="submit" w="full">
                Add Note
              </Button>
            </VStack>
          </form>
        </Box>
        {/* --- FORM END --- */}

        <VStack spacing={4} align="stretch" maxW="800px" mx="auto">
          {notes.map((note) => (
            <Card
              key={note._id}
              bg="white"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
            >
              <CardBody>
                <HStack justify="space-between">
                  <Heading size="md">{note.title}</Heading>
                  <Text
                    fontSize="xs"
                    bg="green.100"
                    color="green.800"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {note.category}
                  </Text>
                  {/* DELETE BUTTON START */}
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteHandler(note._id)} // ID pass ki
                  >
                    Delete
                  </Button>
                  {/* DELETE BUTTON END */}
                </HStack>
                <Divider my={2} />
                <Text>{note.content}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default App;
