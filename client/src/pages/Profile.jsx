import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadFileProgress, setUploadFileProgress] = useState(0);
  const [uploadFileError, setUploadFileError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleImageUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadFileProgress(Math.round(progress));
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setUploadFileError(true);
        setFile(undefined);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          if (downloadURL) {
            setFormData({ ...formData, avatar: downloadURL });
            setFile(undefined);
          }
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleImageUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          name="image"
          id="file"
          className="file:mr-4 file:rounded-full file:border-0 file:bg-slate-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-100 dark:file:bg-slate-600 dark:file:text-violet-100 dark:hover:file:bg-slate-500"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData?.avatar || currentUser?.avatar}
          alt={currentUser?.username}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
        />
        {uploadFileError && (
          <span className="text-red-500 text-center">
            Error uploading image
          </span>
        )}
        {uploadFileProgress > 0 && uploadFileProgress < 100 && (
          <span className="text-slate-500 text-center text-sm">
            Uplaoding {uploadFileProgress}%
          </span>
        )}
        {uploadFileProgress == 100 && (
          <span className="text-green-500 text-center text-sm">
            Image uploaded successfully
          </span>
        )}
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <button className="bg-slate-700 hover:opacity-95 disabled:opacity-80 rounded-lg text-white uppercase p-3">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
