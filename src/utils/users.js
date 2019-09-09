const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room };
    users.push(user);

    return { user };
}

addUser ({ 
    id: 41, 
    username: 'Elisha', 
    room: 'MyRoom'
});

const res = addUser ({ 
    id: 22, 
    username: 'Elisha1', 
    room: 'myRoom'
});

console.log(res);
 