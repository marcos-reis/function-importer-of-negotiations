
export interface StorageManager{
  listDirectories: (path: string) => Promise<string[]>
}
