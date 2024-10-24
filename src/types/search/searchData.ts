export interface SearchInstructions {
    recordtype?: string;
    recordid?: number;
    state?: string;
    searchtext?: string;
    onlymyrecords?: boolean;
    numrecords?: number;
    pagenum?: number;
    sortfield?: string;
    sortdir?: 'asc' | 'desc';
    updatedbefore?: string;
    updatedafter?: string;
    includecustomfields?: boolean;
}