"use client"
import { useLoadingStore } from '@/store';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { BsBack } from 'react-icons/bs';
import { BiArrowBack } from "react-icons/bi";

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [scale, setScale] = useState(1);
  const [imageData, setImageData] = useState({});
  const editorRef = useRef();
const setLoadingG = useLoadingStore(state=>state.setLoadingG) 
const router = useRouter()

useEffect(()=> {
  setLoadingG(false);
}, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageData({name: file.name, type:file.type})
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!imageSrc || !editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    const croppedImage = canvas.toDataURL(imageData?.type);
    
    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = croppedImage;
    downloadLink.download =  "cropped " + (imageData?.name || 'image.jpeg');

    // Trigger click event on the anchor element to initiate download
    downloadLink.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={e=> {setLoadingG(true); router.back()}} className='flex fixed top-20 md:top-28 left-2 md:left-10 items-center text-sky-950 dark:text-gray-200 space-x-1'><BiArrowBack /> <div>
        Back
        </div> 
        </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="imageInput"
      />
      <label htmlFor="imageInput" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
        Upload Image
      </label>
      {imageSrc && (
        <div className="mb-4">
          <AvatarEditor
            ref={editorRef}
            image={imageSrc}
            width={200}
            height={200}
            border={50}
            color={[0, 255, 255, 0.8]} // RGBA
            scale={scale}
            rotate={0}
          />
          <input
            type="range"
            value={scale}
            min={1}
            max={2}
            step={0.01}
            onChange={e => setScale(parseFloat(e.target.value))}
            className="mt-2"
          />
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={!imageSrc}
        className={`px-4 py-2 bg-green-500 text-white rounded ${!imageSrc && 'opacity-50 cursor-not-allowed'}`}
      >
        Download Cropped Image
      </button>
    </div>
  );
};

export default ImageCropper;
