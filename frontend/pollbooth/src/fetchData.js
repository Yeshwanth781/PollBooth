
import { API_URL } from "./constants";

export const Get_Teams = async ({ set_teams,id }) => {
    var customers = {};
    console.log("Arey oo baiya")
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
                    customers = (jsonRes)
                    console.log('All Teams:', customers);
                    set_teams(customers);
                    return customers;
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
export const Get_Polls = async ({ set_polls, id }) => {
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
                    set_polls(polls);
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

export const Add_Option = async ({ optionname,id }) => {
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
 
export const Add_Poll = async ({id,pollname}) => {
    fetch(`${API_URL}/polls/add/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            pollname,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then( function (res) {
            const jsonRes = res.json();
        }).then((data)=>{
            console.log("Added Poll Succesfully....");
            return data;
        } 
        )
        .catch(error => console.error('Error:', error));
}

export const Cast_Vote = async ({ id }) => {
    fetch(`${API_URL}/polls/vote/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then( function (res) {
            const jsonRes = res.json();

        }).then((data)=>{
            console.log("Voted Succesfully...")
            return data;
        }
        )
        .catch(error => console.error('Error:', error));
}