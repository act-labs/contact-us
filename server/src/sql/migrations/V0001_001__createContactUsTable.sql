
CREATE TABLE IF NOT EXISTS CONTACT_US (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    first_name varchar(25),
    last_name varchar(25),
    phone varchar(25),
    address varchar(255),
    email varchar(50),
    message text
)
