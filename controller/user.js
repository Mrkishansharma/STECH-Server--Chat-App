
const usersDB = [];

const userJoined = (obj) =>{

    usersDB.push(obj);
    // console.log(usersDB);
}

const leaveRoom = (sid) => {
    const ind = usersDB.findIndex((ele)=>ele.id===sid);
    
    if(ind != -1){
        const deleteduser =  usersDB.splice(ind, 1)[0]
        // console.log(usersDB);
        return deleteduser
    }

}

const getUser = (sid) => {
    const user = usersDB.find((ele)=> ele.id===sid)
    return user
}

const getUsersList = (room) => {


    const users = usersDB.reduce((acc,curr)=>{
        if(curr.room===room){
            acc.push(curr.username)
        }
        return acc
    },[])

    return {
        room:room,
        users: users
    }
}


module.exports = {
    userJoined,
    leaveRoom,
    getUser,
    getUsersList
}