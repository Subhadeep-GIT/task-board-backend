import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { title, description, start_time } = req.body;
  if (!title || !start_time) return res.status(400).json({ error: 'Title and Start Time are required' });

  try {
    const [result] = await pool.execute(
      'INSERT INTO tasks (title, description, start_time) VALUES (?, ?, ?)',
      [title, description || null, start_time]
    );
    res.status(201).json({ message: 'Task created', task_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}