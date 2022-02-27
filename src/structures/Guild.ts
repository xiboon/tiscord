import { APIGuild } from 'discord-api-types/v10';
import { Channel, ChannelManager, Client, Member, MemberManager, Role } from '../';
import { ThreadChannel } from './ThreadChannel';

export class Guild {
    client: Client;
    ownerId: string;
    owner: boolean;
    discoverySplash: string;
    splash: string;
    iconHash: string;
    icon: string;
    name: string;
    id: string;
    premiumProgressBarEnabled: boolean;
    scheduledEvents: any;
    stickers: any;
    stageInstances: any;
    nsfwLevel: any;
    maxVideoChannelUsers: number;
    publicUpdatesChannelId: string;
    locale: string;
    boosterCount: number;
    premiumTier: any;
    banner: string;
    description: string;
    vanityUrlCode: string;
    maxMembers: number;
    presences: any;
    threads: ThreadChannel[];
    channels: ChannelManager;
    members: MemberManager;
    voiceStates: any;
    memberCount: number;
    available: boolean;
    large: boolean;
    joinedAt: string;
    rulesChannelId: string;
    systemChannelFlags: any;
    systemChannelId: string;
    applicationId: string;
    mfaLevel: any;
    features: any;
    emojis: any;
    roles: any;
    explicitContentFilter: any;
    defaultMessageNotifications: any;
    verificationLevel: any;
    widgetChannelId: string;
    widgetEnabled: boolean;
    afkTimeout: number;
    afkChannelId: string;
    permissions: string;
    raw?: APIGuild;
    constructor(client: Client, data: APIGuild) {
        data.members?.forEach(member => {
            client.cache.members.set(data.id, new Member(client, member));
        });
        data.channels?.forEach(channel => {
            client.cache.channels.set(data.id, new Channel(client, channel));
        });
        data.roles?.forEach(role => {
            client.cache.roles.set(data.id, new Role(client, role));
        });
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.iconHash = data.icon_hash;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.owner = data.owner;
        this.ownerId = data.owner_id;
        this.permissions = data.permissions;
        this.afkChannelId = data.afk_channel_id;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        this.widgetChannelId = data.widget_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        this.roles = data.roles;
        this.emojis = data.emojis;
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationId = data.application_id;
        this.systemChannelId = data.system_channel_id;
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelId = data.rules_channel_id;
        this.joinedAt = data.joined_at;
        this.large = data.large;
        this.available = !data.unavailable;
        this.memberCount = data.member_count;
        this.voiceStates = data.voice_states;
        this.members = new MemberManager(this.client, this.id);
        this.channels = this.client.channels;
        this.threads = data.threads?.map(t => new ThreadChannel(this.client, t));
        this.presences = data.presences;
        this.maxMembers = data.max_members;
        this.vanityUrlCode = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.boosterCount = data.premium_subscription_count;
        this.locale = data.preferred_locale;
        this.publicUpdatesChannelId = data.public_updates_channel_id;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.nsfwLevel = data.nsfw_level;
        this.stageInstances = data.stage_instances;
        this.stickers = data.stickers;
        this.scheduledEvents = data.guild_scheduled_events;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        if (client.raw) this.raw = data;
    }
}
