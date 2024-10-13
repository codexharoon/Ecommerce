"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type CategoryColumn = {
  id: string;
  name: string;
  billboard: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => `${row.original.billboard}`,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction category={row.original} />,
  },
];
