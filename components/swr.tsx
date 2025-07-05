"use client";

import axiosInstance from "@/app/utils/axios";
import { AxiosResponse } from "axios";
import { SWRConfig } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const res: AxiosResponse = await axiosInstance.get(url);
          return res;
        },
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
