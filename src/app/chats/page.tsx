'use client'

import { Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getLogs, getSallerCustomer } from '@/services/api'
import { IChat, ICustomer, IMessage } from '../interfaces/chat'
import { Loading } from '@/components/loading'
import Image from 'next/image'

import whatsapp from '../../assets/whatsapp.svg'
import { LoadingButton } from '@/components/loadingButton'
import {
  formatDate,
  getEngagementIcon,
  maskPhone,
  limitText,
} from '@/lib/utils'
import { MultiSelect } from '@/components/multi-select'

const itemsPage = 10
const options = ['1', '2', '3', '4', '5']

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
  const [filterSelected, setFilterSelected] = useState<boolean>(false)
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const fetchData = async () => {
    setLoadingChats(true)

    const [res1, res2] = await Promise.all([
      getLogs(),
      getSallerCustomer(),
    ]).then((data) => {
      return data
    })

    const sortList: IChat[] =
      res1 &&
      res1.data &&
      res1.data.chatLogs.filter(
        (item: IChat) =>
          item.contactId.value !== '1a3bfe5d-c9e3-4d0e-8562-8b821451f3ce' &&
          item.contactId.value !== '4e05f6a1-9ae8-43e6-a451-cd60013beccb',
      )
    if (sortList && sortList.length > 0) {
      sortList.sort((a: IChat, b: IChat) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
    }

    setChats(sortList ?? [])
    setCustomers((res2 && res2.data && res2.data.customers) ?? [])
    setLoadingChats(false)
  }

  const toggleSelection = (value: string) => {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value] // Mantém a ordem de seleção
      }
    })
  }

  const filterByEngajamento = (data: IChat[], selected: string[]) => {
    if (filterSelected && selected.length > 0) {
      return selected.flatMap((value) =>
        data.filter((item) => item.currentLeadEngagement === value),
      )
    } else {
      return data
    }
  }

  const loadMoreData = (type?: 'button') => {
    if (chats?.length === 0) {
      return
    }

    if (!type && pageCurrent - 1 !== clickButton) {
      return
    }

    setLoadButton(true)

    const init = (pageCurrent - 1) * itemsPage
    const end = init + itemsPage

    let updateChats: IChat[] = chats
    if (!type) {
      updateChats = chats?.map((item) => {
        if (!item.name) {
          const customer = customers.find(
            (customer: ICustomer) => customer.id === item.contactId.value,
          )
          item.name = customer?.name ?? 'Não identificado'
          item.phoneNumber = customer?.phoneNumber
            ? maskPhone(customer?.phoneNumber)
            : ''
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

        item.engagementIcon = item.currentLeadEngagement
          ? getEngagementIcon(item.currentLeadEngagement)
          : ''

        return item
      })

      setChats(updateChats)
    }
    const itemsNew = updateChats.slice(init, end) ?? []

    const listOrdenated: IChat[] = [...itemsShow, ...itemsNew]
    if (itemsNew.length > 0) {
      setPageCurrent((prev) => prev + 1)
    }
    setItemsShow(listOrdenated)
    setLoadButton(false)
  }

  const listFiltred =
    searchTerm && !filterSelected
      ? itemsShow.filter((chat: IChat) => {
          return chat.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
      : filterSelected
      ? filterByEngajamento(itemsShow, selected)
      : itemsShow

  const timePassed = (date: string) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000) // diferença em segundos

    if (diff < 60) {
      return `${diff} min`
    }

    const minutes = Math.floor(diff / 60)
    if (minutes < 60) {
      return `${minutes} min`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return `${hours} h${hours > 1 ? 's' : ''}`
    }

    const days = Math.floor(hours / 24)
    return `${days} d${days > 1 ? "'s" : ''}`
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
          <div className="flex justify-around items-center m-2  ">
            <Filter
              className="m-2 cursor-pointer text-gray-400"
              size={20}
              onClick={() => setFilterSelected(!filterSelected)}
            />
            {!filterSelected ? (
              <Input
                placeholder={'Buscar por nome'}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=""
              />
            ) : (
              <MultiSelect
                open={open}
                options={options}
                setOpen={setOpen}
                selected={selected}
                toggleSelection={toggleSelection}
              />
            )}
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
                          {limitText(item.lastMessage, 20)}
                        </p>
                      </div>
                      <div className="flex justify-between w-20 ml-auto">
                        <span className="text-gray-500 ">
                          {timePassed(item.updatedAt.toString())}
                        </span>
                        <Image
                          alt="whatsapp-icon"
                          src={whatsapp}
                          width={20}
                          height={20}
                        />
                      </div>
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
                    loadMoreData('button')
                  }}
                >
                  Carregar mais conversas dddddddd
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
                <p className="font-semibold">
                  {chatData.name} -{' '}
                  <span className="font-normal text-gray-500">
                    {chatData.phoneNumber}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {limitText(chatData.lastMessage, 30)}
                </p>
              </div>
            </div>
          )}
          {loadingMessages ? (
            <Loading />
          ) : (
            <div className="flex flex-col-reverse space-y-2 snap-y overflow-scroll h-[calc(100vh-100px)] p-4">
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
                    <div className="max-w-xs bg-gray-200 p-2 m-1 rounded-md text-sm">
                      <div className="flex flex-col">
                        <span className="justify-start">{msg.content}</span>
                        <span className="justify-end text-gray-500">
                          {formatDate(msg.createdAt.toString()).date}{' '}
                          {formatDate(msg.createdAt.toString()).hour}
                        </span>
                      </div>
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
