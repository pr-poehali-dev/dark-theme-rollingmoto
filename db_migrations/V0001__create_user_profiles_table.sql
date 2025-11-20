CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT,
    birth_date DATE,
    city VARCHAR(100),
    preferred_bike_type VARCHAR(50),
    notes TEXT
);

CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);

COMMENT ON TABLE user_profiles IS 'Профили пользователей мотосалона RollingMoto';
COMMENT ON COLUMN user_profiles.email IS 'Email пользователя (уникальный)';
COMMENT ON COLUMN user_profiles.full_name IS 'Полное имя пользователя';
COMMENT ON COLUMN user_profiles.phone IS 'Номер телефона';
COMMENT ON COLUMN user_profiles.preferred_bike_type IS 'Предпочитаемый тип мотоцикла (спорт, круизер, туринг)';
