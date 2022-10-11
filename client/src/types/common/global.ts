export interface CommonObject {
  [key: string]: any
}

export interface ReducerActionType {
  type: string
  payload?: object
}


export type EmitType = string | number | object
