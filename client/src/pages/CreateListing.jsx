import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file?.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setIsUploadingImage(true);
      for (let index = 0; index < files.length; index++) {
        promises.push(storeImage(files[index]));
      }

      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          setIsUploadingImage(false);
          setImageUploadError(false);
        })
        .catch((error) => {
          setImageUploadError("Error in uploading image");
        });

      setImageUploadError(false);
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setIsUploadingImage(false);
    }
  };

  function handleRemoveImage(index) {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => index !== i),
    });
  }

  return (
    <main className="max-w-7xl mx-auto p-3">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            maxLength="62"
            minLength="10"
            className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
            required
          ></textarea>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
            required
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="bedrooms"
                  placeholder="Bed rooms"
                  maxLength="10"
                  minLength="1"
                  className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
                  required
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="bathrooms"
                  placeholder="Bath rooms"
                  maxLength="10"
                  minLength="1"
                  className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
                  required
                />
                <p>Bathrooms</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  placeholder="Regular price"
                  className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
                  required
                />
                <p>Price</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  placeholder="Discount price"
                  className="border bg-white border-gray-300 rounded-lg focus:outline-none p-3"
                  required
                />
                <p>Discount</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-semibold">
            Images:
            <span className="text-gray-400">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-4">
            <input
              className="file:mr-4 p-2 border-2 border-gray-400 file:border-1 file:rounded-sm file:bg-slate-50 file:px-5 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-100 dark:file:bg-slate-600 dark:file:text-violet-100 dark:hover:file:bg-slate-500"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={isUploadingImage}
              onClick={handleImageSubmit}
              className="p-3 w-[20%] text-green-700 border border-green-700 hover:shadow-lg rounded disabled:opacity-80"
            >
              {isUploadingImage ? "loading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((image, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={image}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  className="bg-red-500 p-3 text-white hover:opacity-75 disabled:opacity-80"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
