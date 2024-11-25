export interface Petition {
  id: string;
  title: string;
  description: string;
  signatures: Signature[];
  createdAt: Date;
}

export interface Signature {
  id: string;
  name: string;
  timestamp: Date;
}