const settings = require('./settings.json');

const bloxy = require("bloxy");
const client = new bloxy.Client({
  credentials: {
    cookie: settings.cookie
  }
});

let groupId = settings.groupId;
let personDoingTheAbuse = settings.personDoingTheAbuse;
let iterations = settings.iterations;
let nextCursor = "";

let cutoffTime = settings.cutoffTime;

let toDo = [];

(async () => {
  const authenticatedUser = await client.login();

  let auditFunction = function () {
    client.apis.groupsAPI.getAuditLogs({ groupId: groupId, limit: 50, actionType: "ChangeRank", sortOrder: "Asc", cursor: nextCursor == "" ? undefined : nextCursor, userId: personDoingTheAbuse }).then(logs => {
      logs.data.forEach(log => {
        if (new Date(log.created).getTime() > new Date(cutoffTime).getTime()) {
          toDo.push({
            id: log.description.TargetId,
            name: log.description.TargetName,
            oldRole: log.description.OldRoleSetId,
            oldRoleName: log.description.OldRoleSetName,
            date: log.created
          });
        }
      });

      iterations -= 1;
      if (iterations <= 0) {
        toDo.forEach((item, ind) => {
          console.log(item)
          setTimeout(async () => {
            client.apis.groupsAPI.updateMember({
              groupId: groupId,
              userId: item.id,
              roleId: item.oldRole
            }).then(() => {
              console.log(item.name, "has been ranked back to", item.oldRoleName)
            })
          }, 100 * ind);
        });
      } else {
        nextCursor = logs.nextPageCursor == "" ? undefined : logs.nextPageCursor
        console.log("got logs for another page")
        setTimeout(() => {
          auditFunction();
        }, 500);
      }
    });
  }

  auditFunction();
})();