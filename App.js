import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, FlatList, Text, View, Button } from "react-native";

    const App = () => {
    const [isLoading,   setLoading] =   useState(true);
    const [data,        setData] =      useState([]);
    const [isAdded,     setAdded] =     useState(false);
    const [isRemoved,   setRemoved] =   useState(false);
    const [isUpdated,   setUpdated] =   useState(false);
    const [empID,       setempID] =     useState("");
    const [emp,         setemp] =       useState({

    name: "",
    phone: "",
    department: "", // change to department
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
});
    const onChangeName = (value) => {setemp({ ...emp, name: value }); //Name
};
    const onChangePhone = (value) => {setemp({ ...emp, phone: value }); //Phone
};
    const onChangeDepartment = (value) => {setemp({ ...emp, department: value }); //Department
};
    const onChangeStreet = (value) => {setemp({ ...emp, street: value }); //Street
};
    const onChangeCity = (value) => {setemp({ ...emp, city: value }); //City
};
    const onChangeState = (value) => {setemp({ ...emp, state: value }); //State
};
    const onChangePostcode = (value) => {setemp({ ...emp, postcode: value }); //Postcode
};
    const onChangeCountry = (value) => {setemp({ ...emp, country: value }); //Country
};

// ########################[ ADDING A STAFF MEMBER ]#########################
const addEmployee = () => {
    let newEmployee = {};

    let d = `name=${emp.name}&phone=${emp.phone}&department=${emp.department}&street=${emp.street}&city=${emp.city}&state=${emp.state}&postcode=${emp.postcode}&country=${emp.country}`;

    fetch("http://localhost:44350/helloworldWebService1.asmx/AddStaff", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded",
        },
        body: d,
})

    .then((responseData) => {
        setAdded(true);
        getStaff();
        clearFormEmpFields();
        console.log("Done");
    })
    .catch((err) => {
        console.log(err);
    });
};

const clearFormEmpFields = () => {
    emp.name = "";
    emp.phone = "";
    emp.department = ""; // change to departments
    emp.city = "";
    emp.street = "";
    emp.state = "";
    emp.postcode = "";
    emp.country = "";
};
// ###########################################################################

// ########################[ GETTING THE STAFF LIST ]#########################
const getStaff = async () => {
    try {
        const response = await fetch("http://localhost:44350/helloworldWebService1.asmx/GetStaff");
        const json = await response.json();
        setData(json);
// console.log(json); // To Test if getfetch works
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};
// ##########################################################################

// ########################[ DELETING A STAFF MEMBER ]#########################
const deleteEmployee = () => {
    console.log("empID=" + empID);
    let employee = {
        id: empID,
    };
        let d = `id=${employee.id}`;

    fetch("http://localhost:44350/helloworldWebService1.asmx/DeleteStaff", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",
        },
        body: d,
    })
    .then((responseData) => {
        setRemoved(true);
        getStaff();
        console.log("Done");
    })
    .catch((err) => {
        console.log(err);
    });
};
// ##########################################################################

// ########################[ UPDATING STAFF DETAILS]#########################
const updateEmployee = () => {
    let employee = {
        id:         empID,
        name:       emp.name,
        phone:      emp.phone,
        department: emp.department,
        city:       emp.city,
        street:     emp.street,
        state:      emp.state,
        postcode:   emp.postcode,
        country:    emp.country,
    };

    let d = `id=${employee.id}&name=${employee.name}&phone=${employee.phone}&department=${employee.department}&city=${employee.city}&street=${employee.street}&state=${employee.state}&postcode=${employee.postcode}&country=${employee.country}`;

    fetch("http://localhost:44350/helloworldWebService1.asmx/UpdateStaffDirectory", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",
        },
        body: d,
    })
    .then((responseData) => {
        setUpdated(true);
        getStaff();
        console.log("Done");
    })
    .catch((err) => {
        console.log(err);
    });
};
// ###################################################################

// #####################[ USE EFFECTS ]###############################

useEffect(() => 
{ 
    getStaff();
}, []);

useEffect(() =>
{
    if (isAdded) {const timer = setTimeout(() => {setAdded(false);
        }, 750); // .75 seconds.
    }
})

useEffect(() =>
    {
        if (isRemoved) {const timer = setTimeout(() => {setRemoved(false);
            }, 750); // .75 seconds.
        }
    })
useEffect(() =>
{
    if (isUpdated) {const timer = setTimeout(() => {setUpdated(false);
        }, 750); // .75 seconds.
    }
})
// ###################################################################

// #######################[ BUTTON AND AESTHETICS]####################
return (
    <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
    <ActivityIndicator />
    ) : (
    <View>
        <h1 style = {{ textAlign: 'center', fontSize: 44}}> 
            Staff Contact Directory
        </h1>

        <TextInput placeholder={"Name: "} onChangeText={(value) => onChangeName(value)} value={emp.name}/>
        <TextInput placeholder={"Phone Number: "} onChangeText={(value) => onChangePhone(value)} value={emp.phone}/>
        <TextInput placeholder={"Department (0-4): "} onChangeText={(value) => onChangeDepartment(value)} value={emp.department}/>
        <TextInput placeholder={"[Address] City:"} onChangeText={(value) => onChangeCity(value)} value={emp.city}/>
        <TextInput placeholder={"[Address] Street Name:"} onChangeText={(value) => onChangeStreet(value)} value={emp.street}/>
        <TextInput placeholder={"[Address] Postcode: "} onChangeText={(value) => onChangePostcode(value)} value={emp.postcode}/>
        <TextInput placeholder={"[Address] State: "} onChangeText={(value) => onChangeState(value)} value={emp.state}/>
        <TextInput placeholder={"[Address] Country: "} onChangeText={(value) => onChangeCountry(value)} value={emp.country}/>

    
    <br/>
        <Text>{isAdded ? "[ Successfully Added ]" : ""}</Text>
        <TextInput placeholder={"[          To Delete / Update Staff Info, Enter ID Here:           ]"} onChangeText={(value) => setempID(value)} value={empID}/>
    <br/>
    <Button title="[ADD]" onPress={addEmployee}></Button><br/>
    <Button title="[Delete]" onPress={deleteEmployee}></Button><br/>
    <Button title="[Update]" onPress={updateEmployee}></Button><br/>
    
    <Text>{isRemoved ? "[ Fired ]" : ""}</Text>
    <Text>{isUpdated ? "[ Updated ]" : ""}</Text>
    <br/>

    <p1 style = {{ textAlign: 'center', fontSize: 24}}>
        Employee Details
    </p1>
    <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
 // UPDATE THIS BELOW PART
 // Id looks wrong, check to see if its the problem later on.
        // const address = `${item.Street}, ${item.City}, ${item.State}, ${item.Postcode}, ${item.Country}`;
        // return (
        <Text>
            {item.ID}. | Name:  {item.Name} | [{item.Department.Name}] - Department | ADDRESS: {item.Street} {item.City}, {item.State}, {item.Postcode}, {item.Country} | (PHONE: {item.Phone}) | 
        </Text>
                )}
            />
        </View>
        )}
        </View>
    );
};
export default App;