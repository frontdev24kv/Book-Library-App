import { useState } from 'react';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.trim() && author.trim()){
      console.log(title, author);
      
    }else{
      alert('All the fields must be fill in')
    }
    setTitle('')
    setAuthor('')
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id='author' value={author} onChange={e => setAuthor(e.target.value)}/>
        </div>
        <button>Add book</button>
      </form>
    </div>
  );
};

export default BookForm;
