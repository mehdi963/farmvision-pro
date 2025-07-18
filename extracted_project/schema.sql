-- Table pour les utilisateurs
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'observateur',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les parcelles
CREATE TABLE Parcelles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    nom VARCHAR(100) NOT NULL,
    surface DECIMAL(10, 2),
    location GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les cultures
CREATE TABLE Cultures (
    id SERIAL PRIMARY KEY,
    parcelle_id INTEGER REFERENCES Parcelles(id),
    nom VARCHAR(100) NOT NULL,
    type VARCHAR(100),
    date_plantation DATE,
    date_recolte DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les animaux
CREATE TABLE Animaux (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    nom VARCHAR(100) NOT NULL,
    type VARCHAR(100),
    date_naissance DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les alertes
CREATE TABLE Alertes (
    id SERIAL PRIMARY KEY,
    parcelle_id INTEGER REFERENCES Parcelles(id),
    type VARCHAR(100) NOT NULL,
    message TEXT,
    date_alerte TIMESTAMP DEFAULT NOW(),
    resolue BOOLEAN DEFAULT FALSE
);