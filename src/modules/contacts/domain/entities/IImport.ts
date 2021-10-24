export interface IImport {
  id: string;
  file_name: string;
  status: "HOLD" | "PROCESSING" | "FAILED" | "FINISHED";
  download_url?: string;
  created_at: Date;
  owner_id: string;
}
