import {
  Box,
  Heading,
  VStack,
  Input,
  IconButton,
  useToast,
  StackDivider,
  Text,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Todo {
  id: number;
  text: string;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('gray.100', 'gray.700');

  const addTodo = () => {
    if (input === '') {
      toast({
        title: 'No content',
        description: "Todo can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={8}>
        <Heading mb={6}>Todo App</Heading>

        <HStack>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
          />
          <IconButton
            aria-label="Add todo"
            icon={<FaPlus />}
            onClick={addTodo}
          />
        </HStack>

        <VStack
          divider={<StackDivider />}
          borderColor="gray.100"
          borderWidth="2px"
          p={4}
          borderRadius="md"
          w="100%"
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
          alignItems="stretch"
          bg={bg}
        >
          {todos.map((todo) => (
            <HStack key={todo.id}>
              <Text flex={1}>{todo.text}</Text>
              <IconButton
                aria-label="Delete todo"
                icon={<FaTrash />}
                onClick={() => deleteTodo(todo.id)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;