import xFetch from './xFetch';

export async function getAll() {
  return xFetch('/api/todos');
}

export async function getLogin() {
  return xFetch('/api/login');
}