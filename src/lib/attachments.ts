import { post } from './api'
import { AttachmentUploadUrlResponse, AttachmentRegisterResponse, AttachmentRegisterRequest } from './types'

export async function uploadFile(file: File): Promise<AttachmentRegisterResponse> {
  try {
    // Step 1: Get signed URL
    const urlData = await post<AttachmentUploadUrlResponse>('/attachments/upload-url')
    const { signedUrl, key } = urlData

    // Step 2: Upload file to signed URL (binary)
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
    })
    
    if (!uploadRes.ok) {
      const errorText = await uploadRes.text().catch(() => '')
      throw new Error(`File upload failed: ${uploadRes.status} ${errorText}`)
    }

    // Step 3: Register attachment with backend
    const registerData: AttachmentRegisterRequest = {
      key,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
    }
    
    const attachmentRes = await post<AttachmentRegisterResponse>('/attachments', registerData)
    return attachmentRes
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}