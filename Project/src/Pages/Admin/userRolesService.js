import {auth} from '../../config/firebase.js'
import { getItemInCollection } from './ContentManagement/content_service.js';

export const RoleAdmin = 'admin';

const getCurrentUserId = () =>{
    const currentUser = auth.currentUser;
    if(currentUser)
        return currentUser.uid;
    // General user
    return null; 
}

export const getCurrentUser = async () => {
    const currentUser = auth.currentUser;
    if(currentUser){
        try{
            const roles = await getUserRoles(currentUser.uid);
            const user = {
                username: currentUser.displayName,
                roles: roles
            }
            return user;
        }
        catch(err){
            console.error(err);
        }
    }
    return null;
}

const getUserRoles = async (userId) => {
    const user = await getItemInCollection(userId, 'users');
    if(!user){
        return;
    }
    return user.roles;
}

export const userIsInRole = async (rolesAllowed) => {
    const userId = getCurrentUserId();
    if(!userId)
        return false;
    console.log(`User Id ${userId}`);
    try{
        const userRoles = await getUserRoles(userId); //expecting a map from firestore

        if(!userRoles)
            return false;

        for(const role of rolesAllowed){
            if(userRoles[role] && userRoles[role] == true){
                // User has one of the allowed roles
                return true;
            }   
        }
    }
    catch(err){
        console.error(err);
        return false;
    }

    // User does not have any of the allowed roles
    return false;
}