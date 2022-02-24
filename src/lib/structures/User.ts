import { APIUser } from 'discord-api-types/v9';

export class User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    system: boolean;
    banner: string;
    flags: any;
    accentColor: number;
    raw: APIUser;
    constructor(data: APIUser) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot;
        this.system = data.system;
        this.banner = data.banner;
        this.flags = data.public_flags;
        this.accentColor = data.accent_color;
        this.raw = data;
    }
}
