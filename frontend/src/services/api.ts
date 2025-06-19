import type {
    ApiResponse,
    Image,
    Character,
    Record,
    GetAllImagesResponse,
    GetImageResponse,
    GetCharactersResponse,
    GetRecordsResponse,
    VerifyCharacterRequest,
    PostRecordRequest,
} from "../types/models";

const API_BASE_URL: string = "http://localhost:3000/api";

async function handleFetch<T>(
    fetchPromise: Promise<Response>,
    defaultErrorMsg: string
): Promise<ApiResponse<T>> {
    try {
        const response = await fetchPromise;
        const json = await response.json();
        if (!response.ok) {
            const errorResponse: ApiResponse<T> = {
                success: false,
                error: {
                    code: json.error?.code || "FETCH_ERROR",
                    message:
                        json.error?.message ||
                        defaultErrorMsg ||
                        response.statusText,
                },
            };
            return errorResponse;
        }
        return json as ApiResponse<T>;
    } catch (error) {
        console.error("Network Error:", error);
        const errorResponse: ApiResponse<T> = {
            success: false,
            error: {
                code: "NETWORK_ERROR",
                message: defaultErrorMsg,
            },
        };
        return errorResponse;
    }
}

export async function getAllImages(): Promise<GetAllImagesResponse> {
    return handleFetch<Image[]>(
        fetch(`${API_BASE_URL}/images`),
        "Failed to fetch images"
    );
}

export async function getImageById(imageId: number): Promise<GetImageResponse> {
    return handleFetch<Image>(
        fetch(`${API_BASE_URL}/images/${imageId}`),
        "Failed to fetch image"
    );
}

export async function getCharactersByImageId(
    imageId: number
): Promise<GetCharactersResponse> {
    return handleFetch<Character[]>(
        fetch(`${API_BASE_URL}/images/${imageId}/characters`),
        "Failed to fetch characters"
    );
}

export async function getRecordsByImageId(
    imageId: number
): Promise<GetRecordsResponse> {
    return handleFetch<Record[]>(
        fetch(`${API_BASE_URL}/images/${imageId}/records`),
        "Failed to fetch records"
    );
}

export async function verifyCharacter(
    imageId: number,
    characterId: number,
    x: number,
    y: number
): Promise<VerifyCharacterRequest> {
    return handleFetch<{ inside: boolean }>(
        fetch(`${API_BASE_URL}/characters/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageId, id: characterId, x, y }),
        }),
        "Failed to verify character"
    );
}

export async function postRecord(
    imageId: number,
    name: string,
    score: number
): Promise<PostRecordRequest> {
    return handleFetch<Record>(
        fetch(`${API_BASE_URL}/images/${imageId}/records`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageId, name, score }),
        }),
        "Failed to post record"
    );
}
