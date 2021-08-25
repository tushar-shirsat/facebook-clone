import Image from "next/image";
import { useSession } from "next-auth/client";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
const InputBox = () => {
  const [session] = useSession();
  const InputRef = useRef(null);
  const FilePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const sendPost = (e) => {
    e.preventDefault();
    if (!InputRef.current.value) return;

    db.collection("posts")
      .add({
        message: InputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    InputRef.current.value = "";
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />

        <form className="flex flex-1">
          <input
            ref={InputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 outline-none"
            type="text"
            placeholder={`what's on your mind, ${session.user.name}`}
          />
          <button hidden onClick={sendPost} type="submit">
            submit
          </button>
          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-110 transition duration-150 transform scale-105 cursor-pointer"
            >
              <img
                src={imageToPost}
                className="h-10 object-contain"
                alt="post"
              />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          )}
        </form>
      </div>

      <div className="flex justify-between p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => FilePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Post/Video</p>
          <input
            ref={FilePickerRef}
            type="file"
            onChange={addImageToPost}
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">FeelingActivity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
