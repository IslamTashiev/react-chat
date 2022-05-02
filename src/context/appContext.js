import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { createContext, useReducer } from "react";
import { db } from "../firebase/config";

const INITIAL_STATE = {
  messages: [],
};

const reduser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};

export const appContext = createContext();

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reduser, INITIAL_STATE);

  const getMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const messagesSnapshot = await getDocs(q);

    const messages = messagesSnapshot.docs.map((message) => {
      return { ...message.data(), id: message.id };
    });

    dispatch({
      type: "SET_MESSAGES",
      payload: messages,
    });
  };
  const createMessage = async (message) => {
    await addDoc(collection(db, "messages"), message);
    getMessages();
  };

  return (
    <appContext.Provider
      value={{
        messages: state.messages,
        getMessages,
        createMessage,
      }}>
      {children}
    </appContext.Provider>
  );
}
