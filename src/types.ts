export interface Dialect {
  id: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  region: 'egypt' | 'gulf' | 'levant' | 'maghreb' | 'iraq_sudan_yemen' | 'msa' | 'global';
  regionNameAr: string;
  description: string;
  samplePhrases: string[];
  phoneticTips: string;
}

export interface VoicePersona {
  id: string; // 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr'
  nameAr: string;
  nameEn: string;
  gender: 'male' | 'female';
  toneAr: string;
  descriptionAr: string;
  avatarColor: string;
}

export interface VoiceStyle {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
}

export interface VoiceoverItem {
  id: string;
  text: string;
  dialectId: string;
  dialectName: string;
  voiceId: string;
  voiceName: string;
  styleId: string;
  styleName: string;
  audioBase64: string;
  mimeType: string;
  createdAt: number;
  durationSeconds?: number;
  isFavorite?: boolean;
}

export interface ScriptTemplate {
  id: string;
  title: string;
  category: 'commercial' | 'reel' | 'documentary' | 'podcast' | 'explainer';
  categoryAr: string;
  dialectId: string;
  text: string;
  description: string;
}
