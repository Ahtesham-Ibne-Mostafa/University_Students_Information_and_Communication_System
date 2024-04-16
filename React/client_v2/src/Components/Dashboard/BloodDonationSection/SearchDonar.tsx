import axios from "axios";
import { useEffect, useState } from "react";

// Donar interface
interface Donor {
  id: number;
  name: string;
  blood_group: string;
  student_id: string;
  contact_no: string;
  email_address: string;
  house_address: string;
}

const SearchDonar = () => {
  // declare state
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searchBloodGroup, setSearchBloodGroup] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Donor[]>("http://localhost:3002/donors");
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // handling search functionalities
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBloodGroup(event.target.value);
  };

  const filteredDonors = donors.filter((donor) =>
    donor.blood_group.toLowerCase().includes(searchBloodGroup.toLowerCase())
  );

  return (
    <div className="mainContent">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Blood Group"
          value={searchBloodGroup}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Name: {donor.name}</h5>
                <p className="card-text">Blood Group: {donor.blood_group}</p>
                <p className="card-text">Student ID: {donor.student_id}</p>
                <p className="card-text">Contact No: {donor.contact_no}</p>
                <p className="card-text">
                  Email Address: {donor.email_address}
                </p>
                <p className="card-text">
                  House Address: {donor.house_address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDonar;
