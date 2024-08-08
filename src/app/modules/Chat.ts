import { Message } from "./Message";


export interface Chat{
    chatId: Number;
    adminId: Number;
    technicianId: Number;
    messageDTOS:Message[];
}