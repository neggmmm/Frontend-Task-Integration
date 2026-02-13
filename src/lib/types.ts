export interface Language {
	id: string
	name: string
	code: string
}

export interface Voice {
	id: string
	name: string
	tag?: string
	language: string
}

export interface Prompt {
	id: string
	name: string
	description?: string
}

export interface Model {
	id: string
	name: string
	description?: string
}

export interface AttachmentUploadUrlResponse {
  key: string
  signedUrl: string
  expiresIn: number
}

export interface AttachmentRegisterRequest {
  key: string
  fileName: string
  fileSize: number
  mimeType: string
}

export interface AttachmentRegisterResponse {
  id: string
  key: string
  fileName: string
  fileSize: number
  mimeType: string
}