export type AuthResponseModel = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | string;
  message?: string;
};
