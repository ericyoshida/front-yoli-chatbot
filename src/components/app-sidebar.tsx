'use client'

import * as React from 'react'
import { Bot, MessageSquare } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Chat e Conversas',
      url: '/chats',
      icon: MessageSquare,
      isActive: true,
    },
    {
      title: 'Envio de mensagens',
      url: '/messages',
      icon: Bot,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="-ml-1" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
