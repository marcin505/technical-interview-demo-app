import { useEffect, useState } from "react";
import { Entry } from "./Store/types";

const baseURL = "https://api.publicapis.org/entries";

export const useFetchHook = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}`);
      const responseJSON = await response.json();
      setLoading(false);
      const entries = responseJSON.entries;
      setEntries(entries);
      setCategories(
        entries.reduce(
          (acc: Entry[], cur: Entry, index: number) =>
            (entries[index + 1] &&
              cur.Category !== entries[index + 1].Category) ||
            !entries[index + 1]
              ? [...acc, cur.Category]
              : [...acc],
          [] as boolean[]
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const removeHandler = ({ api }: { api: string }) => {
    setEntries((entries) => entries.filter((entry) => entry.API !== api));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { entries, removeHandler, loading, categories };
};
