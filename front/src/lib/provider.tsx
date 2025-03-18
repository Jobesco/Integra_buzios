'use client'
import React, { ReactNode, useState } from "react";
import SelectedCategoryContext, { HolderContext, holderType } from "./context";

const SelectedCategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Set<number>>(new Set());

  return (
    <SelectedCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }
      }
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};

const HolderProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [holder, setHolder] = useState<holderType>({
    keyword: '',
    type: '',
    place: '',
    area: ''
  })

  return (
    <HolderContext.Provider value={{ holder, setHolder }}>
      {children}
    </HolderContext.Provider>
  )
}

export { SelectedCategoryProvider, HolderProvider }
