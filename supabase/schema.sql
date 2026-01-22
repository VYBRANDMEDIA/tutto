-- Tutto Chat - Complete Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(320) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  voornaam VARCHAR(100) NOT NULL,
  achternaam VARCHAR(100) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  gemeente VARCHAR(100),
  provincie VARCHAR(100),
  role VARCHAR(20) DEFAULT 'vrager' CHECK (role IN ('vrager', 'aanbieder', 'admin')),
  language VARCHAR(10) DEFAULT 'en',
  
  -- Stripe fields
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  subscription_status VARCHAR(20) DEFAULT 'none' CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'none')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  
  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_verified BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(100) UNIQUE NOT NULL,
  beschrijving TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Oproepen (requests) table
CREATE TABLE oproepen (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  categorie_id INTEGER REFERENCES categories(id),
  
  titel VARCHAR(100) NOT NULL,
  beschrijving TEXT NOT NULL,
  
  bereik VARCHAR(20) NOT NULL CHECK (bereik IN ('gemeente', 'provincie', 'landelijk')),
  locatie_gemeente VARCHAR(100),
  locatie_provincie VARCHAR(100),
  
  status VARCHAR(20) DEFAULT 'actief' CHECK (status IN ('actief', 'gesloten', 'verwijderd')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- Chats table
CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  oproep_id INTEGER REFERENCES oproepen(id) ON DELETE CASCADE,
  vrager_id UUID REFERENCES users(id) ON DELETE CASCADE,
  aanbieder_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'blocked')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,
  
  UNIQUE(oproep_id, aanbieder_id)
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  message TEXT NOT NULL,
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Postcode mapping table
CREATE TABLE postcode_mapping (
  postcode VARCHAR(10) PRIMARY KEY,
  gemeente VARCHAR(100) NOT NULL,
  provincie VARCHAR(100) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_oproepen_status ON oproepen(status);
CREATE INDEX idx_oproepen_bereik ON oproepen(bereik);
CREATE INDEX idx_oproepen_categorie ON oproepen(categorie_id);
CREATE INDEX idx_oproepen_user ON oproepen(user_id);
CREATE INDEX idx_chats_vrager ON chats(vrager_id);
CREATE INDEX idx_chats_aanbieder ON chats(aanbieder_id);
CREATE INDEX idx_messages_chat ON messages(chat_id);
CREATE INDEX idx_messages_unread ON messages(is_read) WHERE is_read = FALSE;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE oproepen ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Categories: Everyone can read active categories
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (is_active = TRUE);

-- Oproepen: Users can create, view based on role and location
CREATE POLICY "Users can create oproepen" ON oproepen
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own oproepen" ON oproepen
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Aanbieders can view matching oproepen" ON oproepen
  FOR SELECT USING (
    status = 'actief' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'aanbieder'
      AND users.subscription_status = 'active'
    )
  );

CREATE POLICY "Users can update own oproepen" ON oproepen
  FOR UPDATE USING (auth.uid() = user_id);

-- Chats: Participants can view their chats
CREATE POLICY "Users can view own chats" ON chats
  FOR SELECT USING (
    auth.uid() = vrager_id OR 
    auth.uid() = aanbieder_id
  );

CREATE POLICY "Aanbieders can create chats" ON chats
  FOR INSERT WITH CHECK (
    auth.uid() = aanbieder_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'aanbieder'
      AND users.subscription_status = 'active'
    )
  );

-- Messages: Chat participants can view and create messages
CREATE POLICY "Chat participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND (chats.vrager_id = auth.uid() OR chats.aanbieder_id = auth.uid())
    )
  );

CREATE POLICY "Chat participants can create messages" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = chat_id 
      AND (chats.vrager_id = auth.uid() OR chats.aanbieder_id = auth.uid())
    )
  );

CREATE POLICY "Users can mark own messages as read" ON messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND (chats.vrager_id = auth.uid() OR chats.aanbieder_id = auth.uid())
    )
  );

-- Seed initial categories
INSERT INTO categories (naam, beschrijving, icon) VALUES
  ('Klussen & Reparatie', 'Hulp bij klussen en reparaties', 'Wrench'),
  ('Verhuizen & Vervoer', 'Verhuishulp en transport', 'Truck'),
  ('Tuinonderhoud', 'Tuin- en buitenwerk', 'Flower'),
  ('Bijles & Educatie', 'Lessen en educatie', 'GraduationCap'),
  ('Gezelschap & Uitgaan', 'Sociale activiteiten', 'Users'),
  ('Sport & Fitness', 'Sport en beweging', 'Dumbbell'),
  ('Administratie & ICT', 'Computer en administratie', 'Laptop'),
  ('Overig', 'Overige hulpvragen', 'MoreHorizontal');

-- Enable Realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE chats;
ALTER PUBLICATION supabase_realtime ADD TABLE oproepen;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for oproepen updated_at
CREATE TRIGGER update_oproepen_updated_at BEFORE UPDATE ON oproepen
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update chat last_message_at
CREATE OR REPLACE FUNCTION update_chat_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chats SET last_message_at = NOW() WHERE id = NEW.chat_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for messages to update chat
CREATE TRIGGER update_chat_on_message AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_chat_last_message();

-- Done! Your database is ready.
