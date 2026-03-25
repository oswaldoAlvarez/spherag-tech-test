export type LoginCredentials = {
  email: string;
  password: string;
};

export type TokenPayload = {
  token: string;
  expiration: string;
};

export type LoginResponse = {
  accessToken: TokenPayload;
  refreshToken: TokenPayload;
};
