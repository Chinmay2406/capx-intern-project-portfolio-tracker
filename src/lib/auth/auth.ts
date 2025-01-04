import { supabase } from '../supabase';
import { AuthResponse } from './types';
import { getAuthErrorMessage } from './errors';

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    if (password.length < 6) {
      return {
        data: null,
        error: { message: 'Password should be at least 6 characters' }
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: { message: getAuthErrorMessage(error) }
      };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: getAuthErrorMessage(err) }
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        data: null,
        error: { message: getAuthErrorMessage(error) }
      };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: getAuthErrorMessage(err) }
    };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export function getUser() {
  return supabase.auth.getUser();
}

export function onAuthStateChange(callback: (session: any) => void) {
  return supabase.auth.onAuthStateChange((_, session) => {
    callback(session);
  });
}