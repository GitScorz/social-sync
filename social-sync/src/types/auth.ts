export interface User {
  id: number;
}

export interface UserInsert extends User {
  provider: string;
  firstname?: string;
  lastname?: string;
  password?: string;
}

export interface Test extends UserInsert {
  email: string;
}

export interface AccountFind {
  provider: string;
  providerAccountId: string;
}

export interface AccountFindByUserId {
  provider: string;
  userId: string;
}

export interface AccountInsert extends AccountFind {
  userId: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Account extends AccountInsert {
  id: number;
}

export interface ProviderConfig {
  id: string;
  name: string;
  component: React.JSX.Element | null;
}

export interface Hashtag {
  hashtag: string;
  posts: number;
}
