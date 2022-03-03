import { APIGuildMember } from 'discord-api-types/v10';
import { User, Client, APIError } from '../';

/**
 * Member class
 * @param {Client} client - Client instance
 * @param {APIGuildMember} data - Member data
 * @class
 * @property {User} user - User instance
 * @property {string} nick - Guild nickname
 * @property {string} avatar - User avatar hash
 * @property {string} joinedAt - when did the member join the guild
 * @property {string[]} roles - array of role IDs
 * @property {string} premiumSince - Since when is the member boosting the guild
 * @property {string} deaf - Is the member deafened
 * @property {string} mute - Is the member muted
 * @property {string} id - Member ID
 * @property {APIGuildMember} raw - Raw member data
 */
export class Member {
    client: Client;
    roles: string[];
    mute: boolean;
    deaf: boolean;
    premiumSince: string;
    joinedAt: string;
    avatar: string;
    nick: string;
    user: User;
    raw?: APIGuildMember;
    id: string;
    guildId: string;
    constructor(client: Client, data: APIGuildMember, guildId: string) {
        this.user = new User(client, data.user);
        this.client = client;
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.joinedAt = data.joined_at;
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.roles = data.roles;
        if (client.raw) this.raw = data;
        this.id = this.user.id;
        this.guildId = guildId;
    }

    /**
     * Kick the member from the server
     * @param {string} reason - The reason of the kick. This will be shown in the audit logs
     */
    async kick(reason?: string) {
        const request = (await this.client.rest.delete(`/guilds/${this.guildId}/members/${this.id}`, {
            headers: { 'X-Audit-Log-Reason': reason }
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }
}
