'use client'
import React, { createContext } from "react";

// Define TypeScript types
interface SelectedCategoryContextType {
  selectedCategory: Set<number>
  setSelectedCategory: React.Dispatch<React.SetStateAction<Set<number>>>
};

// Create the context
const SelectedCategoryContext = createContext<SelectedCategoryContextType | undefined>(undefined)

export default SelectedCategoryContext

export type holderType = {
  keyword: string,
  type: string,
  place?: string,
  area: string
}

// TODO change this to multiple arrays
interface HolderContextType {
  holder: holderType
  setHolder: React.Dispatch<React.SetStateAction<holderType>>
}

const HolderContext = createContext<HolderContextType | undefined>(undefined)

export { HolderContext }