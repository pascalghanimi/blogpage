import React, { useContext, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import AddSection from "./AddSection";
import { UserContext } from "../context/UserProvider";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const AddBlogPost = () => {
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);

  const { user } = useContext(UserContext);

  const fileRef = useRef();

  const handleUploadBlogPost = async () => {
    try {
      const blogRef = collection(db, "blogs");
      const blogDoc = await addDoc(blogRef, {
        title,
        createdBy: user?.id,
        headerImage: null,
        sections,
        timestamp: serverTimestamp(),
      });

      if (file) {
        const imageRef = ref(storage, `blogs/${blogDoc.id}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "blogs", blogDoc.id), {
          headerImage: downloadURL,
        });
      }

      await updateDoc(doc(db, "users", user?.id), {
        blogs: arrayUnion(blogDoc.id),
      });

      toast.success("Post created!");
      setAvatar(null);
      setFile(null);
      setTitle("");
      setSections([]);
    } catch (error) {
      console.log(error);
      toast.error(error.code.replace(/[/-]/g, " "));
    }
  };

  const handleSelectImage = () => {
    fileRef.current.click();
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleAddSection = () => {
    const maxOrder =
      sections.length > 0
        ? Math.max(...sections.map((section) => section.order)) + 1
        : 1;
    console.log(maxOrder);

    const newSection = { order: maxOrder, title: "", text: "" };
    console.log(newSection);
    setSections((prev) => [...prev, newSection]);
  };

  const handleDeleteSection = (order) => {
    const newSections = [];
    for (const section of sections) {
      if (section.order != order) {
        newSections.push(section);
      }
    }
    setSections(newSections);
  };

  const handleUpdateSections = (order, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.order === order ? { ...section, [field]: value } : section
      )
    );
  };

  return (
    <div className=" mx-auto mt-20 max-w-3xl">
      <div className="flex flex-col items-center">
        <button
          className="h-full w-full relative group"
          onClick={handleSelectImage}
        >
          <CiCamera className="absolute w-20 h-20 text-white left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-72 w-full object-cover bg-slate-200 rounded-md"
            />
          ) : (
            <div className="h-72 bg-slate-200 rounded-md"></div>
          )}
          <input
            type="file"
            name="file"
            id="file"
            hidden
            ref={fileRef}
            onChange={handleUploadFile}
          />
        </button>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter a title for your blogpost"
          className="rounded-md border border-gray-300 w-full p-2 outline-none mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full">
          {sections.map((section) => {
            return (
              <div className="mt-10" key={section.order}>
                <AddSection
                  handleUpdateSections={handleUpdateSections}
                  title={section.title}
                  text={section.text}
                  order={section.order}
                  handleDeleteSection={handleDeleteSection}
                />
              </div>
            );
          })}
        </div>
        <button onClick={handleAddSection}>
          <CiCirclePlus className="w-48 h-48 text-gray-300 mt-5" />
        </button>
        <button
          onClick={handleUploadBlogPost}
          className="text-white text-center py-2 bg-blue-400 w-full rounded-md mt-6 mb-20"
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default AddBlogPost;
