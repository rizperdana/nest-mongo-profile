export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  passwortd: string;
}

export interface ProfileDto {
  userId?: string;
  displayName: string;
  image?: string;
  gender: string;
  birthday: Date;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
}
