export type Department =
  | '総務部'
  | '工事部'
  | '環境調査部'
  | '管理部'
  | '役員'
  | '未所属'

export interface User {
  id: string
  name: string
  department: Department
  isMe?: boolean
}

export interface SpaceMessage {
  id: string
  authorId: string
  body: string
  mentions: string[]
  createdAt: string
  viewCount: number
  replyCount: number
}

export interface Space {
  id: string
  name: string
  caseNumber?: string
  visibility: 'public' | 'restricted'
  joined: boolean
  memberIds: string[]
  guestNames?: string[]
  messages: SpaceMessage[]
}

export interface StorageFolder {
  id: string
  name: string
  subfolders: string[]
  fileCount: number
}

export interface ScheduleEvent {
  id: string
  userId: string
  title: string
  date: string // YYYY-MM-DD
}

export type WorkflowStatus = 'pending' | 'approved' | 'mine'

export interface WorkflowTemplate {
  id: string
  name: string
  route: string[]
}

export interface WorkflowDocument {
  id: string
  templateId: string
  title: string
  authorId: string
  status: WorkflowStatus
  createdAt: string
}

export interface PostItem {
  id: string
  authorId: string
  body: string
  createdAt: string
  readCount: number
}
