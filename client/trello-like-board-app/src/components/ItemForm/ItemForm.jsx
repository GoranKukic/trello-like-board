import { useState } from "react";
// import axios from "axios";

const ItemForm = ({ item, onSubmit }) => {
  const [itemTitle, setItemTitle] = useState(item?.title || "");
  const [itemDescription, setItemDescription] = useState(
    item?.description || ""
  );
  const [itemStatus, setItemStatus] = useState(item?.status || "");
  const [itemUser, setItemUser] = useState(item?.user || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      title: itemTitle,
      description: itemDescription,
      status: itemStatus,
      user: itemUser,
    };
    if (item) {
      newItem._id = item._id;
    }
    onSubmit(newItem);
    setItemTitle("");
    setItemDescription("");
    setItemStatus("");
    setItemUser("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li className="mb-[22px]">
          <label htmlFor="title">Title: </label>
          <input
            className="border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            required
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
            value={itemTitle}
          />
        </li>
        <li className="mb-[22px]">
          <label htmlFor="description">Description: </label>
          <input
            className="border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            required
            onChange={(e) => {
              setItemDescription(e.target.value);
            }}
            value={itemDescription}
          />
        </li>
        <li className="mb-[22px] flex flex-col">
          <label htmlFor="status" className="min-w-full">
            Status:{" "}
          </label>
          <select
            id="status"
            className="min-w-full border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setItemStatus(e.target.value);
            }}
            value={itemStatus}
          >
            <option value="TO-DO">TO-DO</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </li>
        <li className="mb-[22px] flex flex-col">
          <label htmlFor="user" className="min-w-full">
            User:{" "}
          </label>
          <select
            id="user"
            className="min-w-full border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setItemUser(e.target.value);
            }}
            value={itemUser}
          >
            <option value="User_1">User 1</option>
            <option value="User_2">User 2</option>
            <option value="User_3">User 3</option>
          </select>
        </li>
        <li className="flex justify-between">
          <button
            className="flex mr-0 ml-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-solid-black rounded-sm leading-[155%] cursor-pointer bg-solidGray
                           transition-colors duration-700 transform hover:bg-white hover:text-solidGray active:bg-gray"
            type="submit"
            value="Submit"
          >
            Delete
          </button>

          <button
            className="flex mr-0 ml-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-solid-black rounded-sm leading-[155%] cursor-pointer bg-solidGray
                           transition-colors duration-700 transform hover:bg-white hover:text-solidGray active:bg-gray"
            type="submit"
            value="Submit"
          >
            Update
          </button>

          <button
            className="flex mr-0 ml-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-solid-black rounded-sm leading-[155%] cursor-pointer bg-solidGray
                           transition-colors duration-700 transform hover:bg-white hover:text-solidGray active:bg-gray"
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </li>
      </ul>
    </form>
  );
};

export default ItemForm;
