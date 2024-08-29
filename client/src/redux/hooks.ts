import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook} from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';

type DispatchFunc = () => ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
