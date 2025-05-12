import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end('Method Not Allowed');

  const { task_id } = req.query;
  if (!task_id) return res.status(400).json({ error: 'Task ID required' });

  try {
    const [result] = await pool.execute('DELETE FROM tasks WHERE task_id = ?', [task_id]);
    res.status(200).json({ message: 'Task deleted', affectedRows: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}