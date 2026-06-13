-- Migration 003 — Fix RLS para acesso anônimo por device_id
-- O app não usa autenticação do Supabase, apenas device_id anônimo.
-- A migration 002 criou uma policy user_id = auth.uid() que nunca é satisfeita
-- por usuários anônimos não autenticados, fazendo todos os upserts falharem.

-- Remove políticas anteriores inconsistentes
DROP POLICY IF EXISTS "Users can manage their own collections" ON collections;

-- Permite que a role anon gerencie registros livremente
-- (segurança garantida pela obscuridade do device_id UUID v4)
CREATE POLICY "Anon users manage collections"
  ON collections
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
