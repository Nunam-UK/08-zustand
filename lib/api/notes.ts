import { api } from './client';
import { NoteData } from '@/types/note-schema';
import { FetchNotesParams, FetchNotesResponse } from '@/types/api';

export const fetchNotes = async ({ 
  page = 1, 
  perPage = 6, 
  search = '', 
  tag = 'all' 
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<NoteData[]>('/8module', {
    params: { 
      page, 
      limit: perPage, 
      search: search || undefined, 
      tag: tag === 'all' ? undefined : tag 
    }
  });

  return { 
    notes: data, 
    totalPages: 5 
  };
};

export const createNote = async (note: Omit<NoteData, 'id' | 'createdAt'>): Promise<NoteData> => {
  const { data } = await api.post<NoteData>('/8module', { 
    ...note, 
    createdAt: new Date().toISOString() 
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<NoteData> => {
  const { data } = await api.get<NoteData>(`/8module/${id}`);
  return data;
};