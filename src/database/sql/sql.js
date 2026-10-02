export const createTableSession = `
CREATE TABLE IF NOT EXISTS session_system (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  expires_in INT DEFAULT NULL,
  ext_expires_in INT DEFAULT NULL,
  expires_on BIGINT DEFAULT NULL,
  not_before BIGINT DEFAULT NULL,
  access_token LONGTEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;