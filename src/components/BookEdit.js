import { useState } from "react";

function BookEdit({book, onSubmit}) {
  const [title, setTitle] = useState(book.title);

  const handleChange = (event) =>{
    setTitle(event.target.value);
  };
  
  const handleSubmit =(event) => {
    event.preventDefault();

    //console.log('New Title', title);
    //onEdit(book.id, title);
    onSubmit(book.id, title);
  };

  return (
    <form className="book-edit" onSubmit={handleSubmit}>
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">
        Save
      </button>
    </form>
    );
}

export default BookEdit;