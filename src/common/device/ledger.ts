import * as SQLite from 'expo-sqlite';

type Expense = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

const getDb = () => {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('micoin.db');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          created_at TEXT NOT NULL
        );
      `);
      return db;
    })();
  }
  return dbPromise;
};

const addExpense = async (title: string, amount: number) => {
  const db = await getDb();
  const createdAt = new Date().toISOString();
  const result = await db.runAsync(
    'INSERT INTO expenses (title, amount, created_at) VALUES (?, ?, ?)',
    title,
    amount,
    createdAt
  );
  return Number(result.lastInsertRowId);
};

const listExpenses = async (limit = 5) => {
  const db = await getDb();
  const rows = await db.getAllAsync<{
    id: number;
    title: string;
    amount: number;
    created_at: string;
  }>('SELECT id, title, amount, created_at FROM expenses ORDER BY id DESC LIMIT ?', limit);

  return rows.map(
    (row): Expense => ({
      id: row.id,
      title: row.title,
      amount: row.amount,
      createdAt: row.created_at,
    })
  );
};

export { addExpense, listExpenses };
export type { Expense };
