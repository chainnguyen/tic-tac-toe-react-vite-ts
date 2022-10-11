// @ts-ignore
// Core
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
// Hooks
import { setSocketConnect } from '@/store/root/root-slice'
// Types
import { EmitType } from '@/types/common/global'

let socket: any = null

export const useSocket = () => {
  const storeDispatch = useDispatch()

  /**
   * Connect server socket
   * @param domain{string}
   */
  const socketConnect = async (domain: string = 'localhost:8080') => {
    socket = await io(domain)
    socket && storeDispatch(setSocketConnect(true))
  }

  /**
   * General function use to broadcast events to the server
   * @param event{string}
   * @param val{string | number | object}
   */
  const socketEmit = (event: string, val: EmitType = '') => {
    socket && socket.emit(event, val)
  }

  /**
   * General function use to listen for events from the server
   * @param event{string}
   * @param fn{object}
   */
  const socketListen = (event: string, fn: object) => {
    socket && socket.on(event, fn)
  }

  const socketDisconnect = () => {
    socket && socket.disconnect()
    storeDispatch(setSocketConnect(false))
  }

  return {
    socketConnect,
    socketEmit,
    socketListen,
    socketDisconnect
  }
}
