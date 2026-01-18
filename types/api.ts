import { NoteData } from './note-schema';

export interface FetchNotesParams {
  page?: number;
  perPage?: number; // Саме perPage, як просив викладач
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: NoteData[];
  totalPages: number;
}