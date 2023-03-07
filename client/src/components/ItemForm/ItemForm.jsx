import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const ItemForm = ({
  item,
  onClose,
  addItemToList,
  listItems,
  setListItems,
  itemToEdit,
  onUpdateItems,
  status,
}) => {
  // states for deafult values of input fields
  const [itemTitle, setItemTitle] = useState(item?.title || "");
  const [itemDescription, setItemDescription] = useState(
    item?.description || ""
  );
  const [itemStatus, setItemStatus] = useState(item?.status || status);
  const [itemUser, setItemUser] = useState(item?.user || "");

  // Adding new item - sending an HTTP request to an API endpoint using the axios library
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        title: itemTitle,
        description: itemDescription,
        status: itemStatus,
        user: itemUser,
      });
      addItemToList(res.data);
      setItemTitle("");
      setItemDescription("");
      setItemStatus("");
      setItemUser("");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  // Updating existing item - sending an HTTP request to an API endpoint using the axios library
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${itemToEdit._id}`,
        {
          title: itemTitle === "" ? itemToEdit.title : itemTitle,
          description:
            itemDescription === "" ? itemToEdit.description : itemDescription,
          status: itemStatus === "" ? itemToEdit.status : itemStatus,
          user: itemUser === "" ? itemToEdit.user : itemUser,
        }
      );
      console.log(res.data);
      onClose();
      onUpdateItems();
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemStatus = useCallback(
    async (status) => {
      try {
        await axios.put(`http://localhost:5500/api/item/${itemToEdit._id}`, {
          title: itemTitle === "" ? itemToEdit.title : itemTitle,
          description:
            itemDescription === "" ? itemToEdit.description : itemDescription,
          status: status === null ? itemToEdit.status : status,
          user: itemUser === "" ? itemToEdit.user : itemUser,
        });
        onUpdateItems();
        console.log("Item status updated successfully.");
      } catch (err) {
        console.log(err);
      }
    },
    [itemToEdit, itemTitle, itemDescription, itemUser, onUpdateItems]
  );

  useEffect(() => {
    updateItemStatus(status);
  }, [status, updateItemStatus]);

  // Deleting existing item - sending an HTTP request to an API endpoint using the axios library
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
      console.log(res.data);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={itemToEdit ? (e) => updateItem(e) : (e) => addItem(e)}>
      <h2 className="w-full text-[28px] md:text-[36px] mb-[20px]">
        {itemToEdit ? itemToEdit.title : "Title"}
      </h2>
      <ul>
        <li className="mb-[22px]">
          <label htmlFor="title">Title</label>
          <input
            className="border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            {...(itemToEdit
              ? { defaultValue: itemToEdit.title }
              : { value: itemTitle })}
            required
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
          />
        </li>
        <li className="mb-[22px]">
          <label htmlFor="description">Description: </label>
          <textarea
            className="border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows="2"
            cols="50"
            placeholder="Description"
            required
            onChange={(e) => {
              setItemDescription(e.target.value);
            }}
            {...(itemToEdit
              ? { defaultValue: itemToEdit.description }
              : { value: itemDescription })}
          />
        </li>
        <li className="mb-[22px] flex flex-col">
          <label htmlFor="status" className="min-w-full">
            Status:
          </label>
          <select
            id="status"
            className="min-w-full border border-gray w-full p-[22px] leading-tight focus:outline-none focus:shadow-outline"
            required
            {...(itemToEdit
              ? { defaultValue: itemToEdit.status }
              : { value: itemStatus })}
            onChange={(e) => {
              setItemStatus(e.target.value);
            }}
          >
            <option value="">Select status</option>
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
            required
            {...(itemToEdit
              ? { defaultValue: itemToEdit.user }
              : { value: itemUser })}
            onChange={(e) => {
              setItemUser(e.target.value);
            }}
          >
            <option value="">Select user</option>
            <option value="Unasigned">Unasigned</option>
            <option value="User_1">User 1</option>
            <option value="User_2">User 2</option>
            <option value="User_3">User 3</option>
          </select>
        </li>
        <li>
          {itemToEdit ? (
            <div className="flex gap-[10px] w-full">
              <button
                className="flex ml-0 mr-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-red rounded-sm leading-[155%] cursor-pointer bg-red
                           transition-colors duration-700 transform hover:bg-white hover:text-red active:bg-gray"
                type="button"
                onClick={() => {
                  deleteItem(itemToEdit._id);
                }}
              >
                Delete
              </button>
              <button
                className="flex mr-0 ml-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-lightBlue rounded-sm leading-[155%] cursor-pointer bg-lightBlue
                           transition-colors duration-700 transform hover:bg-white hover:text-lightBlue active:bg-gray"
                type="submit"
                value="Submit"
              >
                Update
              </button>
            </div>
          ) : (
            <button
              className="flex mr-0 ml-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-solid-black rounded-sm leading-[155%] cursor-pointer bg-solidGray
                           transition-colors duration-700 transform hover:bg-white hover:text-solidGray active:bg-gray"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
          )}
        </li>
      </ul>
    </form>
  );
};

export default ItemForm;
