export interface Contact {
  id?: string;
  name: string;
  location: string;
  groups: string[];
}

export const defaultProps = {
  name: '',
  location: '',
  groups: []
}