import { atom, createStore } from 'jotai';

export const globalJotaiStore = createStore();

export const biometricAuthTimestampAtom = atom<number | null>(null);
