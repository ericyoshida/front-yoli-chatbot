export interface IChat {
  id: string
  name: string
  lastMessage: string
  messages?: IMessage[]
  createdAt: Date
  updatedAt: Date
  currentLeadEngagement: string
  whatsappSellerId: string
}

export interface IMessage {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  isFromCustomer: boolean
  chatLogId: string
}
