-- Active l'extension PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'farmer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Zones (Parcelles)
CREATE TABLE Parcelles (
  id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES Users(id),
  name VARCHAR(100) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  geometry GEOMETRY(Polygon,4326),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Index
  CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE INDEX idx_parcelles_owner_id ON Parcelles (owner_id);

-- Cultures
CREATE TABLE Cultures (
  id SERIAL PRIMARY KEY,
  parcelle_id INT NOT NULL REFERENCES Parcelles(id),
  type VARCHAR(50) NOT NULL,
  planted_on DATE NOT NULL,
  harvested_on DATE,
  yield_est DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Index
  CONSTRAINT fk_parcelle FOREIGN KEY (parcelle_id) REFERENCES Parcelles(id)
);

CREATE INDEX idx_cultures_parcelle_id ON Cultures (parcelle_id);

-- Animaux
CREATE TABLE Animaux (
  id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES Users(id),
  species VARCHAR(50) NOT NULL,
  age INT,
  health_status VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Index
  CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE INDEX idx_animaux_owner_id ON Animaux (owner_id);

-- Alertes
CREATE TABLE Alertes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(id),
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  resolved BOOL DEFAULT FALSE,
    -- Index
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE INDEX idx_alertes_user_id ON Alertes (user_id);