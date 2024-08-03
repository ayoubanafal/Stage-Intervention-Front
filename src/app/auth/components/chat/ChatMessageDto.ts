export class ChatMessageDto {
    user: string;
    message: string;
    //recipient: string;

    constructor(user: string, message: string){//,recipient: string){
        this.user = user;
        this.message = message;
        //this.recipient = recipient;

    }
}