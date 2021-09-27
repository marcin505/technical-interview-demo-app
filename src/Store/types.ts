export interface EntryResponse {
  count: number;
  entries: Entry[];
}

export interface Entry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface EntriesReducerType {
  entries: Entry[];
  isLoading: boolean;
}
export const updateEntries = "updateEntries";

export interface UpdateEntriesAction {
  type: typeof updateEntries;
  entries: Entry[];
}

// {
//   "count": number,
//   "entries": [{
//     "API": string,
//     "Description": string,
//     "Auth": string,
//     "HTTPS": boolean,
//     "Cors": string,
//     "Link": string,
//     "Category": string
//   }]
// }
