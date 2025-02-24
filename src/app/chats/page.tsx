'use client'

import { Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getLogs, getSallerCustomer } from '@/services/api'
import { IChat, ICustomer, IMessage } from '../interfaces/chat'
import { Loading } from '@/components/loading'
import Image from 'next/image'

import fire from '../../assets/fire.svg'
import cloud from '../../assets/cloud.svg'
import cloudSnow from '../../assets/cloud-with-snow.svg'
import snowFlake from '../../assets/snowflake.svg'
import whatsapp from '../../assets/whatsapp.svg'
import LoadingButton from '@/components/loadingButton'

export default function Chat() {
  const [messageSelected, setMessageSelected] = useState<string | null>(null)
  const [chatData, setChatData] = useState<IChat>({} as IChat)
  const [loadingChats, setLoadingChats] = useState(false)
  const [loadButton, setLoadButton] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [chats, setChats] = useState<IChat[]>([])
  const [itemsShow, setItemsShow] = useState<IChat[]>([])
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [pageCurrent, setPageCurrent] = useState(1)
  const [clickButton, setClickButton] = useState(0)
  const itemsPage = 10

  const fetchData = async () => {
    setLoadingChats(true)

    const [res1, res2] = await Promise.all([
      getLogs(),
      getSallerCustomer(),
    ]).then((data) => {
      return data
    })

    const sortList =
      res1 &&
      res1.data &&
      res1.data.chatLogs.filter(
        (item: IChat) =>
          item.contactId.value !== '1a3bfe5d-c9e3-4d0e-8562-8b821451f3ce' &&
          item.contactId.value !== '4e05f6a1-9ae8-43e6-a451-cd60013beccb',
      )
    sortList.sort((a: IChat, b: IChat) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

    setChats(sortList ?? [])
    setCustomers((res2 && res2.data && res2.data.customers) ?? [])
    setLoadingChats(false)
  }

  const getEngagementIcon = (leadEngagement: string) => {
    const currentLeadEngagement = Number(leadEngagement)
    if (currentLeadEngagement >= 4) {
      return fire
    } else if (currentLeadEngagement === 3) {
      return cloud
    } else if (currentLeadEngagement === 2) {
      return cloudSnow
    } else if (currentLeadEngagement <= 1) {
      return snowFlake
    }
  }

  const loadMoreData = () => {
    if (chats?.length === 0) {
      return
    }
    if (pageCurrent - 1 !== clickButton) {
      return
    }
    setLoadButton(true)

    const init = (pageCurrent - 1) * itemsPage
    console.log('🚀 ~ loadMoreData ~ init:', init)
    const end = init + itemsPage
    console.log('🚀 ~ loadMoreData ~ end:', end)
    const itemsNew =
      chats?.slice(init, end).map((item) => {
        if (!item.name) {
          item.name =
            customers.find(
              (customer: ICustomer) => customer.id === item.contactId.value,
            )?.name ?? 'Não informado'
        }
        if (item?.messages && item?.messages.length > 0) {
          item.messages = item?.messages.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        }
        if (item.messages && item.messages.length > 0) {
          item.lastMessage =
            item.messages.find((message) => message.isFromCustomer === true)
              ?.content ?? ''
        }

        item.engagementIcon = getEngagementIcon(item.currentLeadEngagement)

        return item
      }) ?? []

    const listOrdenated: IChat[] = [...itemsShow, ...itemsNew]
    if (itemsNew.length > 0) {
      setPageCurrent((prev) => prev + 1)
    }
    setItemsShow(listOrdenated)
    setLoadButton(false)
  }

  const listFiltred =
    itemsShow.filter((chat: IChat) => {
      if (searchTerm) {
        return chat.name.toLowerCase().includes(searchTerm.toLowerCase())
      } else {
        return chat
      }
    }) ?? []

  const limitText = (text: string, limit: number) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + '...'
    } else {
      return text
    }
  }

  useEffect(() => {
    setLoadingChats(true)
    loadMoreData()
    setLoadingChats(false)
  }, [chats])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setLoadingMessages(true)
    const chatDataSelected = itemsShow.find(
      (item) => item.id === messageSelected,
    )
    setChatData(chatDataSelected ?? ({} as IChat))
    setLoadingMessages(false)
  }, [messageSelected])

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex">
        <div className="flex flex-col h-screen w-1/3 py-4 border-r space-y-4 ">
          <div className="relative m-2 ">
            <Input
              placeholder="Buscar conversa"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter
              className="absolute left-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          {loadingChats ? (
            <Loading />
          ) : (
            <div className="space-y-2  snap-y overflow-scroll h-[calc(100vh-8rem)] ">
              {listFiltred &&
                listFiltred.map((item) => {
                  const cardSelected =
                    item.id === messageSelected ? 'bg-[#39B54A26]' : ''

                  return (
                    <Card
                      className={`p-2 snap-center flex items-center gap-2 cursor-pointer hover:bg-gray-200 scroll-m-0 ${cardSelected}`}
                      onClick={() => setMessageSelected(item.id)}
                      key={item.id}
                    >
                      <div className="relative">
                        <Image
                          alt="engajamento"
                          src={item.engagementIcon}
                          className="absolute top-[-6px] left-[-6px]"
                          width={24}
                          height={24}
                        />

                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {limitText(item.lastMessage, 30)}
                        </p>
                      </div>
                      <Image
                        alt="whatsapp-icon"
                        src={whatsapp}
                        className="ml-auto text-green-500"
                        width={20}
                        height={20}
                      />
                    </Card>
                  )
                })}
              {loadButton ? (
                <LoadingButton />
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 w-full rounded-md hover:bg-green-600"
                  onClick={() => {
                    setClickButton(clickButton + 1)
                    loadMoreData()
                  }}
                >
                  Carregar mais conversas
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 pb-3">
          {chatData && (
            <div className="p-2 flex items-center gap-2 bg-gray-200 scroll-m-0 rounded-md">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <p className="font-semibold">{chatData.name}</p>
                <p className="text-sm text-gray-500">
                  {limitText(chatData.lastMessage, 30)}
                </p>
              </div>
            </div>
          )}
          {loadingMessages ? (
            <Loading />
          ) : (
            <div className="space-y-2 snap-y overflow-scroll h-[calc(100vh-100px)] p-4">
              {chatData &&
                chatData.messages &&
                chatData.messages.map((msg: IMessage) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isFromCustomer === false
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div className="max-w-xs bg-gray-200 p-2 rounded-md text-sm">
                      {msg.content}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
