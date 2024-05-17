import {auth, db} from '../../config/firebase.js'
import { collection, doc, getDoc } from 'firebase/firestore';

export const RoleAdmin = 'admin';

const getCurrentUserId = () =>{
    const currentUser = auth.currentUser;
    if(currentUser)
        return currentUser.uid;
    console.log(`User Id: ${currentUser}`);
    // General user
    return null; 
}

const getUserRoles = async (userId) => {
    
    const userDoc = doc(db, 'users', userId);
    try{
        const user = await getDoc(userDoc);
        return user.data().roles;
    }
    catch(err){
        console.error(err);
    }
}

export const userIsInRole = async (rolesAllowed) => {
    const userId = getCurrentUserId();
    if(!userId)
        return false;
    try{
        const userRoles = await getUserRoles(userId); //expecting a map from firestore

        for(const role of rolesAllowed){
            if(userRoles[role] && userRoles[role] == true){
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