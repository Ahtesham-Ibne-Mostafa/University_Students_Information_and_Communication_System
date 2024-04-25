import axios from 'axios';
import { useEffect, useState } from 'react';

function BloodDonation() {

    const [name, setFullName] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [email, setEmail] = useState("")
    const [houseAddress, setHouseAddress] = useState("")
    const [isAddedSuccess, setSuccessStatus] = useState(false)

    // const handleSubmit = (e:any) => {
    //
    //     console.log("CLEARING")
    //     e.preventDefault();
    //     // reset everything
    //     setFullName("")
    //     setBloodGroup("")
    //     setStudentID("")
    //     setContactNo("")
    //     setEmail("")
    //     setHouseAddress("")
    //     if (isAddedSuccess) {
    //         setSuccessStatus(false)
    //     } 
    // }
    const showAlert = () => {
        alert('Doner added successfully');
    };

    useEffect(() => {
        if (isAddedSuccess) {
            // reset everything
            setFullName("")
            setBloodGroup("")
            setContactNo("")
            setEmail("")
            setHouseAddress("")
            setSuccessStatus(false)
            showAlert()
        }
    }, [isAddedSuccess])

    const createDonor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(name, bloodGroup, contactNo, email, houseAddress);

        axios.post('http://localhost:3002/donate-blood', {
            fullName: name,
            bloodGroup: bloodGroup,
            contactNo: contactNo,
            emailAddress: email,
            address: houseAddress,

        }).then((response) => {

            console.log(response);
            if (response.data.code === 200) {
                console.log("Added successfully");
                setSuccessStatus(true)
            } else {
                console.log("Failed");
            }

        })
    }

    return (
        <div className="px-4 mainContent">
            <h1>
                Blood donation
            </h1>

            <div className="form grid">
                {/* Name */}
                <label className="form-label">Name</label>
                <input type="text" placeholder="Name" value={name} className="form-control"
                    onChange={(event) => setFullName(event.target.value)}
                />

                {/* Blood group */}
                <label className="form-label">Blood group</label>
                <input type="text" placeholder="Blood group" value={bloodGroup} className="form-control"
                    onChange={(event) => setBloodGroup(event.target.value)}
                />


                {/* Contact No */}
                <label className="form-label">Contact No</label>
                <input type="tel" placeholder="Contact No" value={contactNo} className="form-control"
                    onChange={(event) => setContactNo(event.target.value)}
                />


                {/* Email */}
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="Email" value={email} className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                />

                {/* Address */}
                <label className="form-label">Address</label>
                <input type="text" placeholder="Address" value={houseAddress} className="form-control"
                    onChange={(event) => setHouseAddress(event.target.value)}
                />


                <button type="submit" className="btn btn-primary mt-2" onClick={createDonor}>Register</button>
            </div>
        </div>
    );
}

export default BloodDonation;
