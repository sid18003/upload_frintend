import React, { useState } from 'react';
import axios from 'axios';
import "../components/student.css"
const StudentData = () => {
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch student data from the backend API
  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/students-data', {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.data.success) {
        setStudents(response.data.students);
        setErrorMessage('');
      } else {
        setErrorMessage('No students found.');
      }
    } catch (error) {
      setErrorMessage('You are not authorized because this is student login and only teacher can login this , this is role based access control .');
      console.error('Error:', error);
    }
  };

  // Automatically fetch data when the component loads
  React.useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="student-data">
      {students.length > 0 ? (
        <div>
          <h2>Students List</h2>
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <strong>Name:</strong> {student.name} <br />
                <strong>Email:</strong> {student.email}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="not-authorized">
          {errorMessage || "No student data available."}
        </div>
      )}
    </div>
  );
};

export default StudentData;
