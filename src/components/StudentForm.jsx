import React, { useState } from 'react';
import Webcam from 'react-webcam';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '', fatherName: '', mobile: '', dob: '', receipt: '',
    admissionDate: '', batch: '', fee: '', notes: '', photo: null
  });
  const [capture, setCapture] = useState(false);
  const webcamRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, photo: imageSrc });
    setCapture(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, fatherName, mobile, dob } = formData;

    if (!name || !fatherName || !mobile || !dob) {
      alert("Please fill in Name, Father's Name, Mobile Number, and Date of Birth.");
      return;
    }

    alert("✅ Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4 max-w-md mx-auto">
      <label htmlFor="name">Student's Name<span className="text-red-500">*</span>:</label>
      <input id="name" name="name" placeholder="Student's Name" className="input" onChange={handleChange} value={formData.name} />

      <label htmlFor="fatherName">Father's Name<span className="text-red-500">*</span>:</label>
      <input id="fatherName" name="fatherName" placeholder="Father's Name" className="input" onChange={handleChange} value={formData.fatherName} />

      <label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span>:</label>
      <input id="mobile" name="mobile" placeholder="Mobile Number" className="input" onChange={handleChange} value={formData.mobile} />

      <label htmlFor="dob">Date of Birth<span className="text-red-500">*</span>:</label>
      <input id="dob" name="dob" type="date" className="input" onChange={handleChange} value={formData.dob} />

      <label htmlFor="receipt">Receipt Number:</label>
      <input id="receipt" name="receipt" placeholder="Receipt Number" className="input" onChange={handleChange} value={formData.receipt} />

      <label htmlFor="admissionDate">Admission Date:</label>
      <input id="admissionDate" name="admissionDate" type="date" className="input" onChange={handleChange} value={formData.admissionDate} />

      <label htmlFor="batch">Batch:</label>
      <select id="batch" name="batch" className="input" onChange={handleChange} value={formData.batch}>
        <option value="">Select Batch</option>
        <option value="Morning">Morning</option>
        <option value="Evening">Evening</option>
      </select>

      <label htmlFor="fee">Fee (optional):</label>
      <input id="fee" name="fee" placeholder="Fee (optional)" className="input" onChange={handleChange} value={formData.fee} />

      <label htmlFor="notes">Notes (optional):</label>
      <textarea id="notes" name="notes" placeholder="Notes (optional)" className="input" onChange={handleChange} value={formData.notes}></textarea>

      <label htmlFor="photo">Upload Photo:</label>
      <input id="photo" type="file" accept="image/*" onChange={handleImageChange} className="input" />

      <button type="button" onClick={() => setCapture(!capture)} className="bg-blue-500 text-white px-4 py-2 rounded">
        {capture ? 'Cancel' : 'Capture with Webcam'}
      </button>

      {capture && (
        <div className="flex flex-col items-center">
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded" />
          <button type="button" onClick={capturePhoto} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Capture</button>
        </div>
      )}

      {formData.photo && <img src={formData.photo} alt="Preview" className="w-32 h-32 object-cover rounded border" />}

      <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded">Submit</button>
    </form>
  );
}

export default StudentForm;
