import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, description, start_time, end_time } = req.body;

  if (!title || !start_time) {
    return res.status(400).json({ message: 'Title and start_time are required' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO tasks (title, description, start_time, end_time)
       VALUES (?, ?, ?, ?)`,
      [title, description || null, new Date(start_time), end_time ? new Date(end_time) : null]
    );

    res.status(201).json({
      message: 'Task created',
      task_id: result.insertId,
    });
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}