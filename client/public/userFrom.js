export function getFrom() {
    return `<div class="myform">
    <div class="block">
        <div class="label"><label for="user_name">Name</label></div><div><input type="text" name="user_name" id="user_name" value="" placeholder="user name" /></div>
        <div class="label"><label for="user_email">Email</label></div><div><input type="email" name="user_email" id="user_email" value="" placeholder="user email" /></div>
    </div>
    <fieldset>
        <legend class="label">Roles</legend>
        <div>
        <input type="radio" name="role" value="admin" id="role1" /><label for="role1">admin</label>
        </div>
        <div>
        <input type="radio" name="role" value="super admin" id="role2"/><label for="role2">super admin</label>
        </div>
        <div>
        <input type="radio" name="role" value="user" id="role3" /><label for="role3">user</label>
        </div>
    </fieldset>
    <div style="width:400px;">
        <div style="float: left; width: 130px"> 
            <input type="submit"  id="add" name = "add" value="ADD" >
        </div>
        <div style="float: right; width: 225px"> 
            <input type="submit" id="clear" name = "clear" value="CLEAR" >
        </div>
    </div>
</div>
`
}

export function addFunction() {
    document.getElementById("add").addEventListener("click", add);
    clear();
}

export function updateFunction(id) {
    let temp_id = id;
    document.getElementById("add").addEventListener("click", function(){
        update(temp_id)
    });
    clear()
}

function clear() {
    document.getElementById("clear").addEventListener("click", function() {
        document.getElementById('user_email').value = "";
        document.getElementById('user_name').value = "";
        let role = document.querySelector('input[name="role"]:checked');
        if(role) {
            role.checked=false;
            role.value="";
        }
    });
}

function add() {
    let email = document.getElementById('user_email').value;
    let name = document.getElementById('user_name').value;
    let role = validateRoles();
    if(validateName(name) && validateEmail(email) && role) {
          $$("table").add({ name:name, email:email, role:role });
         $$("fromdata").close();
    }
}

function update(id) {
    let email = document.getElementById('user_email').value;
    let name = document.getElementById('user_name').value;
    let role = validateRoles();
    if(validateName(name) && validateEmail(email) && role) {
          $$("table").updateItem(id, { name:name, email:email, role:role });
          $$("fromdata").close();
    }
}

function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) {
        alert('Invalid Email Address');
        return false;
    }
    return true;
}

function validateName(name) {
    name = name.trim();
    if(name.length>0) {
        return true;
    } else {
        alert('Invalid name.');
        return false;
    }
}

function validateRoles() {
    let role = document.querySelector('input[name="role"]:checked');
    role ? role.value : false;
    if(role) {
        return role.value;
    } else {
        alert('Please select role.');
        return false;
    }
}