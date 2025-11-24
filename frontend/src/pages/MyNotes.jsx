import React, { useEffect, useState } from "react";
import axios from "axios";

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

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);

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
      if (editId) {
        // --- UPDATE LOGIC ---
        const { data } = await axios.put(`/api/notes/${editId}`, {
          title,
          content,
          category,
        });

        // Screen par update dikhane ke liye (Purani list mein se wo note dhundh ke replace kar do)
        const updatedNotes = notes.map((note) =>
          note._id === editId ? data : note
        );
        setNotes(updatedNotes);
        setEditId(null); // Wapas Normal mode mein aa jao
      } else {
        // --- CREATE LOGIC (Purana wala) ---
        const { data } = await axios.post("/api/notes", {
          title,
          content,
          category,
        });
        setNotes([...notes, data]);
      }

      // Form clear karo
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error:", error);
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

  const editHandler = (note) => {
    setEditId(note._id); // React ko batao ki hum is note ko edit kar rahe hain
    setTitle(note.title); // Form mein title bhar do
    setContent(note.content); // Form mein content bhar do
    setCategory(note.category); // Form mein category bhar do
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
              <Button
                colorScheme={editId ? "green" : "blue"}
                type="submit"
                w="full"
              >
                {editId ? "Update" : "Add Note"}
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
                  <HStack>
                    {" "}
                    {/* Buttons ko group karne ke liye */}
                    {/* EDIT BUTTON */}
                    <Button
                      size="sm"
                      onClick={() => editHandler(note)} // Edit handler call kiya
                    >
                      Edit
                    </Button>
                    {/* DELETE BUTTON */}
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
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

export default MyNotes;
