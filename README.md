# AuditLogReverter
Quick script that reverts Roblox group audit logs based on the settings.

# Installation
To begin, clone the respository onto your computer. Using a code editor, download the bloxy NPM package by running `npm i --legcacy-peer-deps`.

**(the following instructions are completely optional, but will aid in the autocomplete)**

Once the download is complete, open up your `node_modules` folder and locate the `bloxy` folder. When you find this, open up the folder and follow this path to find the Groups API file: `src/client/apis/GroupsAPI.ts`. Open up the Groups API file.

`Ctrl + F` the word `GetGroupAuditLogsOptions` and go to the first selection that comes up. It should be something like:

```ts
export type GetGroupAuditLogsOptions = {
    groupId: number;
    actionType: "DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelCLanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace";
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
}
```

Add a `userId?: number;` into the type definition. It should look something like:


```ts
export type GetGroupAuditLogsOptions = {
    groupId: number;
    actionType: "DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelCLanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace";
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
    userId?: number;
}
```

Save the file and the autocomplete should be complete!

# Usage

In the main folder, create a new file `settings.json`. Copy and paste anything in the `settings.json.example` file into the `settings.json` file.

## Settings explained

### cookie

This is your Roblox cookie. To get this, open up your browser and go to https://roblox.com/. Right click the website and click on Inspect. Something should pop up on the right side of the screen. If you don't see an Application button on the top row of the right side of your screen, open up the dropdown menu on the top row and click on Application. Under the Cookies button in Storage, open up the cookie that has https://roblox.com/ in its name. Once you click on this, your cookie will be stored in `.ROBLOSECURITY` and it should start with something like: `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_`.

**IMPORTANT: KEEP THIS COOKIE ABSOLUTELY _SECRET_ AND DO NOT SHARE WITH ANYONE ELSE UNLESS YOU WANT YOUR ACCOUNT BREACHED**

### groupId

ID of the group that you want to revert the audit logs for.

### personDoingTheAbuse

ID of the person that you want to revert. For example, if I abused in a group, then I would put my own ID in this field.

### iterations

How many times you want the reverter to run. By default, the reverter will get 50 actions per page by a certain user, and go through 30 pages (totalling 1500 actions by a user).

### cutoffTime

This is the time at which you want the reverter to **stop**. I put this in place because an abuser may not have been an abuser the entire time that they've been in the group; they could've had some non-abusive actions that we want to avoid reverting. This time follows a very specific format that I will detail below. **Please note that all times follow UTC. Please convert accordingly.**

Format: `YYYY-MM-DDTHH:mm:SS.sssZ`

- `YYYY` - Year
- `MM` - Month (01 being January)
- `DD` - Day
- `HH` - Hour
- `mm` - Minute
- `SS` - Second
- `sss` - Millisecond

For example, if the date was January 15, 2022 at 11:00 AM EST, then the time string would be `2022-01-15T16:00:00.000Z` (UTC is five hours ahead of EST, so it'd be 4 PM or 16:00 rather than 11:00).

# Questions?

I know this is a bucketload of information for a script that's quite literally only 50 lines long, but if you have any questions at all about the usage of this script, please feel free to reach out to me on Discord (NicholasY#4815), on the DevForum, or reply on the thread. If you are messaging me on Discord, please join the Roblox server to DM me as I don't frequently accept friend requests.