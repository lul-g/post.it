"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children?: ReactNode;
}
const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    <NextTopLoader color="#ff426b" height={3} />
    {children}
  </QueryClientProvider>
);

export default QueryWrapper;
