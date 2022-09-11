import { findUser } from "./database";

export const authenticateUser = async (id: string) => {
    const user = await findUser(id);
    if (user != undefined) return true;
    return false;
  };
  
export const isMsgFromCorrectGroup = (groupId: number | string) => {
console.log(groupId);
const idStr = String(groupId);
return (
    idStr === process.env.GROUP_ID_AKTIIVICASE ||
    idStr === process.env.GROUP_ID_E ||
    idStr === process.env.GROUP_TEST
);
};