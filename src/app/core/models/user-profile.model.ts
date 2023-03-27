export interface UserProfile {
  user_id: string;
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: Date;
  created_at: Date;
}
