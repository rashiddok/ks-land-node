import { About } from "src/entities/about.entity";

export type AboutReq = Omit<About, 'id'>