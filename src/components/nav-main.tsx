'use client'

import { Play, type LucideIcon } from 'lucide-react'

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { usePathname, useRouter } from 'next/navigation'

export const NavMain = ({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) => {
  const route = useRouter()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          item.isActive = item.url === pathname
          const iconColapse = item.url === pathname ? 'open' : 'closed'
          const backgroundColorActive = item.isActive ? 'bg-gray-300' : ''

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
              onClick={() => {
                route.push(item.url)
              }}
            >
              <SidebarMenuItem
                className={`${backgroundColorActive} rounded-md`}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <Play
                      className={`ml-auto transition-transform duration-200 group-data-[state=${iconColapse}]/collapsible:rotate-90 `}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
