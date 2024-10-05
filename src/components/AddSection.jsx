import React from "react";

const AddSection = ({
  handleDeleteSection,
  order,
  handleUpdateSections,
  text,
  title,
}) => {
  return (
    <div>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter a title for the section"
        className="rounded-md border border-gray-300 w-full p-2 outline-none mt-2"
        value={title}
        onChange={(e) => {
          handleUpdateSections(order, "title", e.target.value);
        }}
      />
      <textarea
        name="text"
        id="text"
        placeholder="Enter a text for the section"
        className="rounded-md border border-gray-300 w-full h-48 p-2 outline-none mt-2"
        value={text}
        onChange={(e) => {
          handleUpdateSections(order, "text", e.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          handleDeleteSection(order);
        }}
        className="text-white rounded-md bg-red-400 w-full py-2 text-center"
      >
        Delete Section
      </button>
    </div>
  );
};

export default AddSection;
