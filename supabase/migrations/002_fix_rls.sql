-- Fix RLS to use auth.uid() instead of broken current_setting

-- Drop broken policy
DROP POLICY IF EXISTS "Users can manage their own collections" ON collections;

-- Add user_id column (nullable for existing rows)
ALTER TABLE collections ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- New policy using auth.uid() instead of current_setting('app.device_id')
CREATE POLICY "Users can manage their own collections"
  ON collections
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
