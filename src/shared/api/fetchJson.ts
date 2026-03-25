import { getAuthSession } from '../lib/authSession';

type FetchJsonOptions = {
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  defaultErrorMessage?: string;
};

const NETWORK_ERROR_MESSAGE =
  'No pudimos conectarnos al servidor. Inténtalo de nuevo en unos segundos.';
const INVALID_RESPONSE_MESSAGE =
  'Recibimos una respuesta inválida del servidor.';
const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error al procesar la solicitud.';

export const fetchJson = async <T>(
  url: string,
  {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = false,
    defaultErrorMessage = DEFAULT_ERROR_MESSAGE,
  }: FetchJsonOptions = {}
): Promise<T> => {
  const requestHeaders = new Headers({
    Accept: 'application/json',
    ...headers,
  });

  if (body) {
    requestHeaders.set(
      'Content-Type',
      requestHeaders.get('Content-Type') ?? 'application/json'
    );
  }

  if (requiresAuth) {
    const session = await getAuthSession();
    const token = session?.accessToken.token;

    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  const payload = await parseJson(response);

  if (!response.ok) {
    const errorPayload =
      payload && typeof payload === 'object'
        ? (payload as {
            message?: string;
            Message?: string;
            title?: string;
          })
        : null;

    throw new Error(
      errorPayload?.message ||
        errorPayload?.Message ||
        errorPayload?.title ||
        defaultErrorMessage
    );
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error(INVALID_RESPONSE_MESSAGE);
  }

  return payload as T;
};

const parseJson = async (response: Response) => {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    return null;
  }
};
