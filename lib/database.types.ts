export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TransactionType = "DEBIT" | "CREDIT";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          mobile_number: string;
          pin: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          mobile_number: string;
          pin: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          mobile_number?: string;
          pin?: string;
          created_at?: string;
        };
      };
      farmers: {
        Row: {
          id: string;
          name: string;
          phone: string;
          village: string;
          aadhar_no?: string;
          photo_url?: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          village: string;
          aadhar_no?: string;
          photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          village?: string;
          aadhar_no?: string;
          photo_url?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          farmer_id: string;
          type: TransactionType;
          amount: number;
          note: string | null;
          date: string;
          created_by_user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          farmer_id: string;
          type: TransactionType;
          amount: number;
          note?: string | null;
          date: string;
          created_by_user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          farmer_id?: string;
          type?: TransactionType;
          amount?: number;
          note?: string | null;
          date?: string;
          created_by_user_id?: string | null;
          created_at?: string;
        };
      };
      vendors: {
        Row: {
          id: string;
          name: string;
          company_name: string | null;
          phone: string | null;
          address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          created_at?: string;
        };
      };
      vendor_transactions: {
        Row: {
          id: string;
          vendor_id: string;
          type: "PURCHASE" | "PAYMENT";
          amount: number;
          note: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          vendor_id: string;
          type: "PURCHASE" | "PAYMENT";
          amount: number;
          note?: string | null;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          vendor_id?: string;
          type?: "PURCHASE" | "PAYMENT";
          amount?: number;
          note?: string | null;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
}

