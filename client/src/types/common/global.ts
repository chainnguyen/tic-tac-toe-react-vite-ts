export interface ICommonObject {
  [key: string]: any
}

export interface IReducerActionType {
  type: string
  payload?: object
}

export type EmitType = string | number | object

export interface ICommonProps {
  onClick?: () => void
  onClickForTest?: () => void
}
