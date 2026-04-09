'use client'

import dayjs from "dayjs";
import 'dayjs/locale/ru'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

dayjs.locale('ru')

export function Providers({ children }: PropsWithChildren) {
    const [ client ] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false
                }
            }
        })
    )

    return (
        <QueryClientProvider client={client}>
            { children }
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

