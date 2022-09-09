export class Goals {
    id: number;
    name: string;
    description : string;
    targetDate : Date;
    targetAmount : number;
    currentAmount : number;
    imageSrc : string;
    username : string;
    userID : number;

    constructor( id: number,
                name: string,
                description : string,
                target_date : Date,
                target_amount : number,
                current_amount : number,
                imageSrc : string,
                username : string,
                userID : number

    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.targetDate = target_date;
        this.targetAmount = target_amount;
        this.currentAmount = current_amount;
        this.imageSrc = imageSrc;
        this.username = username;
        this.userID = userID;
    }
}
