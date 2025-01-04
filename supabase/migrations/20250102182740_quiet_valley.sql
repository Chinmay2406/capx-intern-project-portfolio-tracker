/*
  # Create stocks table and security policies

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `symbol` (text)
      - `name` (text)
      - `quantity` (integer)
      - `purchase_price` (numeric)
      - `current_price` (numeric)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `stocks` table
    - Add policies for authenticated users to:
      - Read their own stocks
      - Insert new stocks
      - Update their own stocks
      - Delete their own stocks
*/

CREATE TABLE stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  purchase_price numeric NOT NULL,
  current_price numeric NOT NULL DEFAULT 0,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT quantity_positive CHECK (quantity > 0)
);

ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own stocks
CREATE POLICY "Users can read own stocks"
  ON stocks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own stocks
CREATE POLICY "Users can insert own stocks"
  ON stocks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own stocks
CREATE POLICY "Users can update own stocks"
  ON stocks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own stocks
CREATE POLICY "Users can delete own stocks"
  ON stocks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);