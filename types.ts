export interface Crop {
  id: string;
  name: string;
  variety: string;
  plantedDate: string;
  expectedHarvest: string;
  status: 'Healthy' | 'Needs Attention' | 'Ready for Harvest';
  area: number; // in acres
  imageUrl: string;
}

export interface MarketData {
  crop: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { month: string; price: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface PestAnalysisResult {
  diagnosis: string;
  confidence: string;
  treatment: string[];
  prevention: string[];
}
