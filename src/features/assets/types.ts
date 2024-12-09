export enum AssetType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
}

export interface Asset {
  id: string
  originalName: string
  name: string
  type: AssetType
  mimeType: string
  fileSize: number
  source: string
  preview?: string
  storageProvider?: string
  channelToken: string
  autoGenerated: boolean
  width?: number
  height?: number
  focalPoint?: Record<string, unknown>
  createdAt?: Date
  updatedAt?: Date
  updatedBy?: string
  createdBy?: string
  deletedAt?: Date
  deletedBy?: string
  featured?: boolean
}
