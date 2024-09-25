import Backend from "@/app/utils/Backend";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default function searchBooks(setData: Dispatch<SetStateAction<Book[] | undefined>>, parameterKey: string, parameterValue: string) {
 
  const { promise, cancel } = Backend.getBooks(parameterKey, parameterValue);

  promise.then(({ data }) => {
    if (!data) {
      throw new Error("Failed to retrieve a list of books with "+parameterValue);
    }
    setData(data.docs);
  })
  .catch((err) => {
    if (axios.isCancel(err)) return cancel;
  });
}