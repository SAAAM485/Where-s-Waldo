export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

export interface Image {
    id: number;
    name: string;
    url: string;
    characters?: Character[];
    records?: Record[];
}

export interface Character {
    id: number;
    name: string;
    x: number;
    y: number;
    avatarUrl: string;
    imageId: number;
    image?: Image;
}

export interface Record {
    id: number;
    name: string;
    score: number;
    imageId: number;
    image?: Image;
}
export type GetAllImagesResponse = ApiResponse<Image[]>;
export type GetImageResponse = ApiResponse<Image>;
export type GetCharactersResponse = ApiResponse<Character[]>;
export type GetRecordsResponse = ApiResponse<Record[]>;
export type VerifyCharacterRequest = ApiResponse<{ inside: boolean }>;
export type PostRecordRequest = ApiResponse<Record>;
