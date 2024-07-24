import { useRef } from 'react';
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [count, setCount] = useState(0);

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const getImage = async () => {
      if(file){
        const data = new FormData();
        data.append('file', file.name);
        data.append('file', file);
        console.log(data);
        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div>
        <h1>File Sharing</h1>
        <p>Upload and share files with anyone</p>
        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <a href={result} target='_blank'>{result}</a>
      </div>
    </>
  );
}

export default App;
