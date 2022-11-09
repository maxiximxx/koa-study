import Koa, { ExtendableContext } from 'koa'

declare module 'koa' {
 export interface ExtendableContext {
    user: string
    success(): void
    success(data: any, message?: string): void
    error(message: string): void
    error(data: any, message: string): void
    error(code: number | string, data: any, message: string): void
  }
}
