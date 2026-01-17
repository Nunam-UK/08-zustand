import { Note } from './note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number; // Саме perPage, як просив викладач
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}