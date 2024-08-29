import { Dispatch, SetStateAction } from "react";

export interface UserMuseums {
  id?:              number;
  email?:           string;
  firstName?:       string;
  lastName?:        string;
  password?:        string;
  city?:            string;
  phone?:           string;
  createdAt?:       Date;
  updatedAt?:       Date;
  visitedMuseums:  EdMuseum[];
  recalledMuseums: EdMuseum[];
}

export interface EdMuseum {
  id:             number;
  name:           string;
  description:    string;
  location:       string;
  city:           string;
  photo:          string;
  workedTime:     string;
  holidays:       string;
  theme:          string;
  coordinates:    string;
  createdAt:      Date;
  updatedAt:      Date;
  Recall?:        Recall;
  VisitedMuseum: VisitedMuseum;
}

export interface Recall {
  text:      string;
  userId:    number;
  museumId:  number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitedMuseum {
  id:        number;
  userId:    number;
  museumId:  number;
  rating:    number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type StarProp = {
  el: number;
  setHover: Dispatch<SetStateAction<{ star: number }>>;
  i: number;
  handlerRating: (e: any) => void;
  hover: { star: number };
  mus: EdMuseum;
  color?: string;
}

export type RecallProps = {
  mus: EdMuseum;
  setUpdate: (el: any) => void;
  visited: UserMuseums;
};