const sentences = {
    'createTable': ` CREATE TABLE IF NOT EXISTS producto (
        id SERIAL NOT NULL,
        descrip VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`,
    'create': `INSERT INTO producto (descrip) VALUES ($1)`,
    'read': `SELECT * FROM producto`,
    'update': `UPDATE producto SET descrip = $1 WHERE id = $2`,
    'delete': `DELETE FROM producto WHERE id = $1`,
    'readOne': `SELECT * FROM producto WHERE id = $1`,
}

export default sentences 