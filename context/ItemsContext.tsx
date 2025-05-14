import React, { createContext, useState, ReactNode } from "react";

export interface Item {
  id: string;
  name: string;
  description: string;
}

interface ItemsContextValue {
  items: Item[];
  addItem: (item: Item) => void;
}

export const ItemsContext = createContext<ItemsContextValue>({
  items: [],
  addItem: () => {},
});

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
}
