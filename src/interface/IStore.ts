import { INote } from "./INote";
import { ITag } from "./ITag";



export interface IStore {
    notes: INote[]
    tags: ITag[]
}