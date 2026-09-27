import {Loader} from "@/common/components/Loader/Loader";
import type {RefObject} from "react";

type Props ={
    observerRef: RefObject<HTMLDivElement | null>
    isFetchingNextPage: boolean
}

export const LoadingTrigger = ({observerRef, isFetchingNextPage}:Props) => {

    return (
        <div ref={observerRef}>
            {isFetchingNextPage ? <Loader/> : <div style={{height: '20px'}}/>}
        </div>
    );
};

