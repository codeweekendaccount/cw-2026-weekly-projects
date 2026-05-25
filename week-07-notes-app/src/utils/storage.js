export function loadNotes() {
  try {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load notes from localStorage', e);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes to localStorage', e);
  }
}
