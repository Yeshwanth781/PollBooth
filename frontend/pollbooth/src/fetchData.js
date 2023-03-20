import { API_URL } from "./constants";
export const Get_Teams = async ({ set_teams, id }) => {
    var teams = {};
    fetch(`${API_URL}/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async res => {
        try {
            const jsonRes = await res.json();
            if (res.status === 200) {
                teams = (jsonRes)
                    console.log('All Teams:', teams);
                    set_teams(teams);
                    return teams;
                }
            } catch (err) {
                console.log(err);
                return {};
            };
        })
        .catch(err => {
            console.log('Error', err);
            return {};
        });
}

export const Get_Polls = async ({ set_polls, id}) => {
    var polls = {};
    fetch(`${API_URL}/polls/all/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    polls = (jsonRes)
                    console.log('All polls:', polls);
                    await set_polls(polls);
                    return polls;
                }
            } catch (err) {
                console.log(err);
                return {};
            };
        })
        .catch(err => {
            console.log('Error', err);
            return {};
        });
    }
    export const Get_Options = async ({ set_options, id }) => {
        var polls = {};
        fetch(`${API_URL}/polls/getpollDetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    polls = (jsonRes)
                    console.log('Poll Options:', polls);
                    await set_options(polls);
                    return polls;
                }
            } catch (err) {
                console.log(err);
                return {};
            };
        })
        .catch(err => {
            console.log('Error', err);
            return {};
        });
}

export const Add_Option = async ({ optionname, id }) => {
    fetch(`${API_URL}/polls/addoption/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            optionname,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(function (response) {
            console.log('Added Success Fully....')
            return response.json()
        })
        .catch(error => console.error('Error:', error));
    }
    
    export const Add_Poll = async ({ id, pollname }) => {
        fetch(`${API_URL}/polls/add/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                pollname,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function (res) {
            const jsonRes = res.json();
        }).then((data) => {
            console.log("Added Poll Succesfully....");
            return data;
        }
        )
        .catch(error => console.error('Error:', error));
}
export const Add_Team = async ({ id, teamname }) => {
    fetch(`${API_URL}/teams/add`, {
        method: 'POST',
        body: JSON.stringify({
            teamname,
            userid: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function (res) {
            const jsonRes = res.json();
        }).then((data) => {
            console.log("Added Team Succesfully....");
            return data;
        }
        )
        .catch(error => console.error('Error:', error));
    }
    export const Cast_Vote = async ({ id,setchanged }) => {
        fetch(`${API_URL}/polls/vote/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function (res) {
        const jsonRes = res.json();
        
    }).then((data) => {
        setchanged(data);
        return data;
    }
    )
    .catch(error => console.error('Error:', error));
}


export const Add_Member = async ({ email, setchanged,id }) => {
    var members={};
    fetch(`${API_URL}/members/addemail/${email}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            teamid: parseInt(id),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(function (res) {
             console.log("Jaaiii balayya");
             const jsonRes =res.json().then((data)=>{
                setchanged(data);
            }
        )})
        .catch(error => console.error('Error:', error));
}

export const Get_Members = async ({ id, setmembers }) => {
    var members= {};

    fetch(`${API_URL}/members/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    members = (jsonRes)
                    console.log('members:', members);
                    await setmembers(members);
                    return members;
                }
            } catch (err) {
                console.log(err);
                return {};
            };
        })
        .catch(err => {
            console.log('Error', err);
            return {};
        });
}

export const Login = async ({ email, password, setdetails }) => {
    fetch(`${API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async (res) => {
        const jsonRes = await res.json();
        console.log("fetched...", jsonRes);
        setdetails(jsonRes);
        return jsonRes;

    })
        .catch(err => {
            console.log(err);
            return [];
        })
}

export const Signup = async ({ name, email, password, setdetails }) => {
    fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async (res) => {
        const jsonRes = await res.json();
        console.log("fetched...", jsonRes);
        if(res.status==200)
        setdetails(jsonRes);
        return jsonRes;
    })
        .catch(err => {
            console.log(err);
            return [];
        })
}