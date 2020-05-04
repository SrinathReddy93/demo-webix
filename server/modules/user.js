let a = { id:0, name:"Srinath", status:1, role:"user",
email:"srinathreddy088@gmai.com" }
let obj = [];
for(let i=1; i<150;i++) {
    let b = {...a}
    if(i>50 && i<100) {
        b.role = "admin"
    } else if(i>100) {
        b.role = "super admin"
    }
    b.id = i;
    b.email = i + b.email;
    obj.push(b)
}

user_data = obj;
let total_user_count = user_data.length;

var user = {
    getAll:(start) => {
        return new Promise((resolve, reject) => {
            let end = 50, result = [];
            for(let i = start; i<= obj.length; i++) {
                if(!end) {
                    break;
                }
                try {
                    if(obj[i].status) {
                        result.push(obj[i]);
                        end--;
                    }
                } catch (error) {
                    console.log('obj[i] ', i)
                }
            }
            //return cb({data:user_data.slice(start, start+50), pos: start, total_count: user_data.length})
            return resolve({data:result, pos: start, total_count: total_user_count})
        });
    },
    getlUsersForChart:() => {
        return new Promise((resolve, reject) => {
            let  result = [];
            let len = obj.length - 1
            for(let i = 0; i<= len; i++) {
               try {
                if(obj[i].status) {
                    result.push(obj[i]);
                }
               } catch (error) {
                   console.log('obj[i] ', i)
               }
            }
            //return cb({data:user_data.slice(start, start+50), pos: start, total_count: user_data.length})
            return resolve({data:result, success:1}) 
        });
    },
    adduser:(data) => {
        return new Promise((resolve, reject)=> {
            try {
                total_user_count++;
                data.id = total_user_count;
                data.status = 1;
                obj.push(data);
                resolve(true);
            } catch (error) {
                console.log('error in adduser ', error);
                reject(error);
            }
        });
    },
    updateUser:(data) => {
        return new Promise((resolve, reject)=> {
            try {
                data.id = data.id - 1;
                let temp = {...obj[data.id], ...data}
                obj[data.id] = temp;
                resolve(true);
            } catch (error) {
                console.log('error in adduser ', error);
                reject(error);
            }
        });
    },
    removeUser:(data) => {
        return new Promise((resolve, reject)=> {
            try {
                obj[data.id-1].status = 0;
                total_user_count--;
                return resolve(true);
            } catch (error) {
                console.log('error in adduser ', error);
                reject(error);
            }
        });
    }
}


module.exports = user;