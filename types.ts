export interface NavItemType {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export interface User {
  id: string;
  email: string;
  profile: Profile;
  credits: {
    balance: number;
  };
}

export interface Profile {
  display_name: string;
  avatar_url: string;
}

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Job {
  id: string;
  status: JobStatus;
  error?: string;
  output_asset_id?: string;
}

export interface Asset {
  id: string;
  url: string; 
}

export interface GalleryItem {
  id: string;
  asset: Asset;
  title: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  current?: boolean;
  popular?: boolean;
  features: { 
    text: string, 
    included: boolean 
  }[];
}