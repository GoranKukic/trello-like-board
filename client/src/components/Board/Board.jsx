import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemForm from "../ItemForm/ItemForm";
import axios from "axios";
import styles from "./Board.module.css";

function Board() {
  let [isOpen, setIsOpen] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [updateItems, setUpdateItems] = useState(false);

  // state for changing item status via drag & drop
  const [status, setStatus] = useState(null);

  // functions for closing modal
  function closeModal() {
    setIsOpen(false);
  }
  // functions for opening modal & secting item for edit
  function openModal(item) {
    setItemToEdit(item);
    setIsOpen(true);
  }

  // function that fetch all items from database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
    // Clearing update item state
    setUpdateItems(false);
  }, [updateItems]);

  const addItemToList = (newItem) => {
    setListItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItems = () => {
    setUpdateItems(true);
  };

  const toDoList = listItems.filter((item) => item.status === "TO-DO");
  const inProgressList = listItems.filter(
    (item) => item.status === "IN PROGRESS"
  );
  const doneList = listItems.filter((item) => item.status === "DONE");

  // pasing item new status to state
  const updateItemStatus = (result) => {
    console.log(result);
    console.log(result.destination.droppableId);
    setStatus(result.destination.droppableId);
  };

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-app-gradient justify-center items-center px-4 py-16">
      <div className="max-w-[820px] w-full">
        <div className="bg-solidGray p-4 rounded-[10px] shadow-xl mb-[40px]">
          <h1 className="text-[32px] md:text-[48px] text-center font-semibold leading-[100%] text-white">
            <span className="text-treloText">Trello </span>Like Board
          </h1>
        </div>
        <button
          className="flex ml-0 mr-auto justify-center items-center h-[55px] max-w-[150px] w-full text-white text-[16px] font-['Open Sans'] font-semibold
                           box-border border-2 border-solid border-solidGray rounded-[5px] leading-[155%] cursor-pointer bg-solidGray shadow-xl
                           transition-colors duration-700 transform hover:bg-white hover:text-solidGray active:bg-lightBlue mb-[40px]"
          type="button"
          onClick={() => openModal()}
        >
          Add item
        </button>
        <DragDropContext onDragEnd={updateItemStatus}>
          <div className="flex flex-row gap-[10px] flex-wrap justify-between items-center">
            <div>
              <p className="capitalize">to do:</p>
              <Droppable droppableId="TO-DO" key={"TO-DO"}>
                {(provided, snapshot) => {
                  return (
                    <ul
                      className="min-h-[300px] min-w-[200px] w-full p-[10px] flex flex-col gap-[10px] rounded-[5px] shadow-xl"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#7FA202"
                          : "white",
                      }}
                    >
                      {toDoList.map((item, index) => {
                        return (
                          <Draggable
                            key={`${item._id}-${index}`}
                            draggableId={`${item._id}-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <li
                                  className="w-full h-[34px] bg-solidGray text-white text-center rounded-[5px] p-[5px] cursor-pointer hover:opacity-60 transform hover:-translate-y-[2px] duration-500 ease-in-out"
                                  onClick={() => openModal(item)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p>{item.title}</p>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
            </div>
            <div>
              <p className="capitalize">in progress:</p>
              <Droppable droppableId="IN PROGRESS" key={"IN PROGRESS"}>
                {(provided, snapshot) => {
                  return (
                    <ul
                      className="min-h-[300px] min-w-[200px] w-full p-[10px] flex flex-col gap-[10px] rounded-[5px] shadow-xl"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#7FA202"
                          : "white",
                      }}
                    >
                      {inProgressList.map((item, index) => {
                        return (
                          <Draggable
                            key={`${item._id}-${index}`}
                            draggableId={`${item._id}-${index}`}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  className="w-full h-[34px] bg-solidGray text-white text-center rounded-[5px] p-[5px] cursor-pointer hover:opacity-60 transform hover:-translate-y-[2px] duration-500 ease-in-out"
                                  onClick={() => openModal(item)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p>{item.title}</p>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
            </div>
            <div>
              <p className="capitalize">done:</p>
              <Droppable droppableId="DONE" key={"DONE"}>
                {(provided, snapshot) => {
                  return (
                    <ul
                      className="min-h-[300px] min-w-[200px] w-full p-[10px] flex flex-col gap-[10px] rounded-[5px] shadow-xl"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#7FA202"
                          : "white",
                      }}
                    >
                      {doneList.map((item, index) => {
                        return (
                          <Draggable
                            key={`${item._id}-${index}`}
                            draggableId={`${item._id}`}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  className="w-full h-[34px] bg-solidGray text-white text-center rounded-[5px] p-[5px] cursor-pointer hover:opacity-60 transform hover:-translate-y-[2px] duration-500 ease-in-out"
                                  onClick={() => openModal(item)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p>{item.title}</p>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>

      {/* Modal */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[675px] transform overflow-hidden bg-white px-[30px] py-[30px] text-left align-middle rounded-[10px] shadow-xl transition-all">
                  <div className="relative mr-0 ml-auto">
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${styles.closeButton} cursor-pointer absolute right-0 top-[15px]`}
                      onClick={closeModal}
                    >
                      <path
                        d="M23.1035 7.74461C22.9642 7.60522 22.7988 7.49465 22.6167 7.4192C22.4347 7.34376 22.2395 7.30493 22.0425 7.30493C21.8454 7.30493 21.6503 7.34376 21.4682 7.4192C21.2862 7.49465 21.1208 7.60522 20.9815 7.74461L15.4175 13.3106L9.85347 7.74561C9.57208 7.46422 9.19043 7.30613 8.79247 7.30613C8.39452 7.30613 8.01287 7.46422 7.73147 7.74561C7.45008 8.02701 7.29199 8.40866 7.29199 8.80661C7.29199 9.20456 7.45008 9.58622 7.73147 9.86761L13.2975 15.4306L7.73247 20.9946C7.59314 21.1339 7.48262 21.2994 7.40721 21.4814C7.3318 21.6634 7.29299 21.8586 7.29299 22.0556C7.29299 22.4536 7.45108 22.8352 7.73247 23.1166C8.01387 23.398 8.39552 23.5561 8.79347 23.5561C9.19143 23.5561 9.57308 23.398 9.85447 23.1166L15.4175 17.5506L20.9815 23.1156C21.2629 23.397 21.6445 23.5551 22.0425 23.5551C22.4404 23.5551 22.8221 23.397 23.1035 23.1156C23.3849 22.8342 23.543 22.4526 23.543 22.0546C23.543 21.6567 23.3849 21.275 23.1035 20.9936L17.5375 15.4306L23.1025 9.86661C23.2419 9.72731 23.3524 9.56191 23.4279 9.37986C23.5033 9.19781 23.5422 9.00268 23.5422 8.80561C23.5422 8.60855 23.5033 8.41342 23.4279 8.23136C23.3524 8.04931 23.2419 7.88391 23.1025 7.74461H23.1035Z"
                        fill="#606060"
                      />
                      <path
                        d="M5.41748 0.430664C4.76087 0.430664 4.11069 0.559993 3.50406 0.811266C2.89744 1.06254 2.34624 1.43084 1.88195 1.89513C0.944265 2.83281 0.41748 4.10458 0.41748 5.43066V25.4307C0.41748 26.7567 0.944265 28.0285 1.88195 28.9662C2.34624 29.4305 2.89744 29.7988 3.50406 30.0501C4.11069 30.3013 4.76087 30.4307 5.41748 30.4307H25.4175C26.7436 30.4307 28.0153 29.9039 28.953 28.9662C29.8907 28.0285 30.4175 26.7567 30.4175 25.4307V5.43066C30.4175 4.77405 30.2882 4.12387 30.0369 3.51725C29.7856 2.91062 29.4173 2.35942 28.953 1.89513C28.4887 1.43084 27.9375 1.06254 27.3309 0.811266C26.7243 0.559993 26.0741 0.430664 25.4175 0.430664H5.41748ZM2.41748 5.43066C2.41748 4.63501 2.73355 3.87195 3.29616 3.30934C3.85877 2.74673 4.62183 2.43066 5.41748 2.43066H25.4175C26.2131 2.43066 26.9762 2.74673 27.5388 3.30934C28.1014 3.87195 28.4175 4.63501 28.4175 5.43066V25.4307C28.4175 26.2263 28.1014 26.9894 27.5388 27.552C26.9762 28.1146 26.2131 28.4307 25.4175 28.4307H5.41748C4.62183 28.4307 3.85877 28.1146 3.29616 27.552C2.73355 26.9894 2.41748 26.2263 2.41748 25.4307V5.43066Z"
                        fill="#606060"
                      />
                    </svg>
                  </div>
                  <ItemForm
                    addItemToList={addItemToList}
                    onClose={closeModal}
                    itemToEdit={itemToEdit}
                    listItems
                    onUpdateItems={handleUpdateItems}
                    status={status}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Board;
