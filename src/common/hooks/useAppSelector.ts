import type {RootState} from "@/app/model/store";
import { useSelector } from "react-redux"

export const useAppSelector = useSelector.withTypes<RootState>()
