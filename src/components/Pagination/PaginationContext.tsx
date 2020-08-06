import React from "react";
import { usePagination } from "../../hooks/usePagination";

export interface PaginationContext extends ReturnType<typeof usePagination> {
}
export interface PaginationContextValue {
  pagination: PaginationContext;
  loading?: boolean;
}
export const PaginationContext = React.createContext<PaginationContextValue | null>(null)