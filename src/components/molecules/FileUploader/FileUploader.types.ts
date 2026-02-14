export interface FileUploaderItem {
  /**
   * Unique identifier for the file
   */
  id: string;
  /**
   * Display name of the file
   */
  name: string;
  /**
   * File size in bytes
   */
  size: number;
}

export interface FileUploaderProps {
  /**
   * List of uploaded files to display
   */
  files: FileUploaderItem[];
  /**
   * Callback fired when new files are selected
   */
  onAddFiles: (files: File[]) => void;
  /**
   * Callback fired when a file is removed
   */
  onRemoveFile: (id: string) => void;
  /**
   * Accepted file types (e.g. ".png,.jpg,.mov,.pdf,.txt")
   */
  accept?: string;
  /**
   * Help text shown below the upload button (e.g. "PNG, JPG, MOV, PDF, TXT")
   */
  helpText?: string;
  /**
   * Whether multiple files can be selected
   * @default true
   */
  multiple?: boolean;
}
