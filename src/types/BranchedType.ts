import { Appstream } from './Appstream'
import { Summary } from './Summary'

export interface BranchedType<T extends Appstream | Summary> {
  [key: string]: T
}
