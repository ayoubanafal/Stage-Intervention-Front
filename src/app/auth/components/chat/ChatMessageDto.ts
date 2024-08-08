export class ChatMessageDto {
    user: string;
    message: string;
    technicianId: string;

    constructor(user: string, message: string,technicianId: string){
        this.user = user;
        this.message = message;
        this.technicianId = technicianId;

    }
}