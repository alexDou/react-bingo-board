import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { StoreState, StoreDispatch } from "../store";

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
