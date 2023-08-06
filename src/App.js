import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  }

  useEffect(() => {
    fetchBooks();
  },[]);

  // dont call fetchBooks() here, it is gonna cause infinite re-rendering
  // hence we use useEffect

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
    title: newTitle
    })
    
    console.log(response);

    const updatedBooks = books.map((book) =>{
      if(book.id === id) {
        return { ...book, ...response.data};
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) =>{
    await axios.delete(`http://localhost:3001/books/${id}`)
    
    const updatedBooks = books.filter((book)=>{
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title)=> {
    //console.log('Need to add book with :', title);
    const response = await axios.post('http://localhost:3001/books', {
      title
    });

    const updatedBooks = [...books,response.data];
      //{ id: Math.round(Math.random() * 9999), title}, // no need to create it manually, server generates the id
    setBooks(updatedBooks);
  };

  return ( 
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
      <BookCreate onCreate={createBook}/>
  </div>
  );
}

export default App; 