import type {
  User,
  Space,
  StorageFolder,
  ScheduleEvent,
  WorkflowTemplate,
  WorkflowDocument,
  PostItem,
} from '../types'

export const CURRENT_USER_ID = 'u1'

export const users: User[] = [
  { id: 'u1', name: '奥田 光世', department: '工事部', isMe: true },
  { id: 'u2', name: '荒井 崇聡', department: '工事部' },
  { id: 'u3', name: '小池 琢也', department: '工事部' },
  { id: 'u4', name: '熊田 克清', department: '環境調査部' },
  { id: 'u5', name: '田代 勝巳', department: '環境調査部' },
  { id: 'u6', name: '佐藤 花子', department: '総務部' },
  { id: 'u7', name: '塩田 暉', department: '工事部' },
  { id: 'u8', name: '谷黒 天祐', department: '役員' },
]

export const userById = (id: string) => users.find((u) => u.id === id)

export const spaces: Space[] = [
  {
    id: 's1',
    name: '北関東環境開発',
    visibility: 'public',
    joined: true,
    memberIds: users.map((u) => u.id),
    messages: [
      {
        id: 'm1',
        authorId: 'u2',
        body: '来週の現場視察の件、資料を共有します。ご確認お願いします。',
        mentions: ['工事部'],
        createdAt: '2026-10-19T16:06:00',
        viewCount: 10,
        replyCount: 0,
      },
      {
        id: 'm2',
        authorId: 'u3',
        body: 'テスト投稿です。閲覧後、返信投稿をお願いします。',
        mentions: ['u4'],
        createdAt: '2026-10-18T15:10:00',
        viewCount: 15,
        replyCount: 2,
      },
    ],
  },
  {
    id: 's2',
    name: '25-001　◯◯造成工事',
    caseNumber: '25-001',
    visibility: 'restricted',
    joined: true,
    memberIds: ['u1', 'u2', 'u4'],
    guestNames: ['佐田（株式会社フォーカス）'],
    messages: [
      {
        id: 'm3',
        authorId: 'u1',
        body: '本日の作業指示書をアップしました。安全確認お願いします。',
        mentions: ['工事部'],
        createdAt: '2026-10-20T08:30:00',
        viewCount: 6,
        replyCount: 1,
      },
    ],
  },
  {
    id: 's3',
    name: '管理部　朝礼議事録',
    visibility: 'restricted',
    joined: false,
    memberIds: ['u6'],
    messages: [],
  },
  {
    id: 's4',
    name: 'テスト用',
    visibility: 'restricted',
    joined: false,
    memberIds: [],
    messages: [],
  },
]

export const storageFolders: StorageFolder[] = [
  {
    id: 'f1',
    name: '25-001　◯◯造成工事',
    subfolders: ['作業指示書', '安全書類', '日報'],
    fileCount: 12,
  },
  {
    id: 'f2',
    name: '24-088　△△地区防災工事',
    subfolders: ['作業指示書', '安全書類', '日報'],
    fileCount: 31,
  },
  {
    id: 'f3',
    name: '社内共通',
    subfolders: ['就業規則', '各種申請書ひな型'],
    fileCount: 8,
  },
]

const today = new Date()
const iso = (offsetDays: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

export const scheduleEvents: ScheduleEvent[] = [
  { id: 'e1', userId: 'u1', title: '25-001 現場巡回', date: iso(1) },
  { id: 'e2', userId: 'u2', title: '施主打合せ', date: iso(2) },
  { id: 'e3', userId: 'u1', title: '安全大会', date: iso(5) },
  { id: 'e4', userId: 'u6', title: '月次会議', date: iso(-2) },
]

export const workflowTemplates: WorkflowTemplate[] = [
  { id: 't1', name: '仮払の（申請）（精算）について', route: ['工事部長', '経営幹部'] },
  { id: 't2', name: '休暇申請', route: ['直属上長'] },
  { id: 't3', name: '工事安全計画書承認', route: ['工事部長', '経営幹部'] },
]

export const workflowDocuments: WorkflowDocument[] = [
  {
    id: 'w1',
    templateId: 't2',
    title: '休暇申請（10/25〜10/26）',
    authorId: 'u1',
    status: 'mine',
    createdAt: '2026-10-15T09:00:00',
  },
  {
    id: 'w2',
    templateId: 't1',
    title: '仮払申請及び精算（9月分）',
    authorId: 'u3',
    status: 'approved',
    createdAt: '2026-09-28T14:00:00',
  },
]

export const posts: PostItem[] = [
  {
    id: 'p1',
    authorId: 'u2',
    body: '来週の現場視察の件、資料を共有します。ご確認お願いします。',
    createdAt: '2026-10-19T16:06:00',
    readCount: 10,
  },
  {
    id: 'p2',
    authorId: 'u1',
    body: '本日の作業指示書をアップしました。安全確認お願いします。',
    createdAt: '2026-10-20T08:30:00',
    readCount: 6,
  },
]
