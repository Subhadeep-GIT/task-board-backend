import pool from '../../lib/db'; // Use relative path for now

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end('Method Not Allowed');

  const { task_id, title, description, status, start_time, end_time } = req.body;
  if (!task_id) return res.status(400).json({ error: 'Task ID required' });

  try {
    const [result] = await pool.execute(
      `UPDATE tasks 
       SET title = ?, description = ?, status = ?, start_time = ?, end_time = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE task_id = ?`,
      [title, description, status, start_time, end_time, task_id]
    );
    res.status(200).json({ message: 'Task updated', affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}