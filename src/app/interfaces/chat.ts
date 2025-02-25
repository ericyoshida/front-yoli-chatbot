export interface IChat {
  id: string
  name: string
  lastMessage: string
  phoneNumber: string
  contactId: {
    value: string
  }
  messages?: IMessage[]
  createdAt: Date
  updatedAt: Date
  currentLeadEngagement: string
  whatsappSellerId: string
  engagementIcon: string
}

export interface ICustomer {
  id: string
  name: string
  customerReferenceId: null
  department: null
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface IMessage {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  isFromCustomer: boolean
  chatLogId: string
}
