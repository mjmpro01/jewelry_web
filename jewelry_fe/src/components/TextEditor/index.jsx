
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const TextEditor = ({ contentValue, setContentValue, readOnly = false }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ]

  return (
    <ReactQuill
      theme="snow"
      value={contentValue}
      onChange={setContentValue}
      modules={modules}
      formats={formats}
      readOnly={readOnly}
    />
  )
}

export default TextEditor