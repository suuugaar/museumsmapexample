export type RouteParams = {
  id: string;
};

export type FavoriteMuseum = {
  id: number;
  userId: number;
  museumId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type favoritesSliceState = {
  favorites: FavoriteMuseum[];
};

export type MuseumType = {
  id: number;
  name: string;
  description: string;
  location: string;
  city: string;
  photo: string;
  workedTime: string;
  holidays: string;
  theme: string;
  coordinates: string;
  recalledByUsers: RecallType[];
  createdAt: Date;
  updatedAt: Date;
};
export type RecallType = {
  id: number;
  text: string;
  userId: number;
  museumId: number;
  createdAt: string;
};

export type VisitedMuseum = {
  id: number;
  userId: number;
  museumId: number;
  createdAt: string;
};

export type visitedSliceState = {
  favorites: VisitedMuseum[];
};

// export type MuseumsType = Array<MuseumType>;

// export type MuseumPropsType = {
//   museum: MuseumType;
// };

// export type MuseumSliceType = {
//   museums: MuseumsType;
// };
