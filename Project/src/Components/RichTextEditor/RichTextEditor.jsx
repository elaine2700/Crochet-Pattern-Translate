import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({content, setContent}) => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}]
    ]
  }

  return (
    <div>
        <ReactQuill 
        theme='snow'
        placeholder="Write your pattern here"
        onChange={setContent}
        modules={modules}
        value={content}
        />
    </div>

  )
}

export default RichTextEditor