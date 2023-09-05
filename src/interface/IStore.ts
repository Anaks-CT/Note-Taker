import { IRawNote } from "./IRawNote";
import { ITag } from "./ITag";



export interface IStore {
    notes: IRawNote[]
    tags: ITag[]
}