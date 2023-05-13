import { useState } from "react";
import { useDropzone } from "react-dropzone";

const ReactDropzone = () => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Assuming only one file was dropped
    const file = acceptedFiles[0];

    // Creating a URL for the dropped image
    const imageUrl = URL.createObjectURL(file);

    // Setting the image state to the URL
    setImage(imageUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {image ? (
        <img src={image} alt="Uploaded image" />
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ReactDropzone;