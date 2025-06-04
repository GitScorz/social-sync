import {
  Account,
  AccountFind,
  AccountFindByUserId,
  AccountInsert,
  Test,
  UserInsert,
} from '@/types/auth';
import { ScheduledPost } from '@/types/dashboard';
import pool from '@/utils/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const createUser = async (
  params: Omit<UserInsert, 'id'>
): Promise<UserInsert> => {
  const { provider, firstname, lastname, password } = params;

  const connection = await pool.getConnection();

  const resp = await connection.query<ResultSetHeader>(
    'INSERT INTO users (provider, firstname, lastname, password) VALUES (?, ?, ?, ?)',
    [provider, firstname, lastname, password]
  );

  connection.release();

  const user: UserInsert = {
    id: resp[0].insertId,
    provider,
  };

  return user;
};

export const findUserById = async (id: string): Promise<UserInsert | null> => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (rows.length > 0) {
      const user = rows[0] as UserInsert;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    connection.release();
  }
};

export const createAccount = async (params: AccountInsert) => {
  const connection = await pool.getConnection();

  const resp = await connection.query<ResultSetHeader>(
    'INSERT INTO accounts (userId, provider, providerAccountId, email) VALUES (?, ?, ?, ?)',
    [params.userId, params.provider, params.providerAccountId, params.email]
  );

  connection.release();

  return params.userId;
};

export const findAccount = async (
  params: AccountFind
): Promise<AccountInsert | null> => {
  try {
    const connection = await pool.getConnection();

    const resp = await connection.query<RowDataPacket[]>(
      'SELECT * FROM accounts WHERE provider = ? AND providerAccountId = ?',
      [params.provider, params.providerAccountId]
    );

    connection.release();

    if (resp[0].length) {
      const rowData = resp[0][0];
      const account: AccountInsert = {
        userId: rowData.userId,
        email: rowData.email,
        provider: rowData.provider,
        providerAccountId: rowData.providerAccountId,
        accessToken: rowData.accessToken,
      };
      return account;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error while finding account:', error);
    return null;
  }
};

export const getUserAccounts = async (userId: string): Promise<Account[]> => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM accounts WHERE userId = ?',
      [userId]
    );

    if (rows.length === 0) {
      return [];
    }

    const accounts = rows as Account[];
    return accounts;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteProvider = async (provider: string, userId?: string) => {
  if (!userId) return false;

  const connection = await pool.getConnection();

  const [resp] = await connection.query<ResultSetHeader>(
    'DELETE FROM accounts WHERE userId = ? AND provider = ?',
    [userId, provider]
  );

  connection.release();

  return resp.affectedRows > 0;
};

export const findAccountByUserId = async (
  params: AccountFindByUserId
): Promise<AccountInsert | null> => {
  try {
    const connection = await pool.getConnection();

    const resp = await connection.query<RowDataPacket[]>(
      'SELECT * FROM accounts WHERE provider = ? AND userId = ?',
      [params.provider, params.userId]
    );

    connection.release();

    if (resp[0].length) {
      const rowData = resp[0][0];
      const account: AccountInsert = {
        userId: rowData.userId,
        email: rowData.email,
        provider: rowData.provider,
        providerAccountId: rowData.providerAccountId,
        accessToken: rowData.accessToken,
        refreshToken: rowData.refreshToken,
      };
      return account;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error while finding account:', error);
    return null;
  }
};

export const sendEmail = async (
  subject: string,
  text: string,
  html: string
) => {
  try {
    const response = await fetch('http://localhost:3000/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchScheduledPosts = async (
  userId: string
): Promise<ScheduledPost[]> => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT *, created_timestamp AS createdTimestamp FROM scheduled_posts WHERE userId = ?',
      [userId]
    );

    if (rows.length === 0) {
      return [];
    }

    const posts = rows as ScheduledPost[];
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection.release();
  }
};

export const createScheduledPost = async (
  userId: string,
  data: ScheduledPost
) => {
  const connection = await pool.getConnection();

  const resp = await connection.query<ResultSetHeader>(
    'INSERT INTO scheduled_posts (userId, content, socialNetwork, scheduledDate) VALUES (?, ?, ?, ?)',
    [userId, data.content, data.socialNetwork, data.scheduledDate]
  );

  connection.release();

  return resp[0].insertId;
};

export const deleteScheduledPost = async (userId: string, postId: number) => {
  const connection = await pool.getConnection();

  const [resp] = await connection.query<ResultSetHeader>(
    'DELETE FROM scheduled_posts WHERE userId = ? AND id = ?',
    [userId, postId]
  );

  connection.release();

  return resp.affectedRows > 0;
};

export const findUserByEmail = async (email: string): Promise<Test | null> => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT userId FROM accounts WHERE email = ?',
      [email]
    );

    const [rows2] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [rows[0].userId]
    );

    if (rows.length > 0) {
      const user = rows2[0] as Test;
      user.email = email;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    connection.release();
  }
};
