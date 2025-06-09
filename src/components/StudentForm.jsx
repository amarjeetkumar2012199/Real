import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://stdonhszqmzmcxteoett.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZG9uaHN6cW16bWN4dGVvZXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzM1MTMsImV4cCI6MjA2NTA0OTUxM30.H8RVprjN3t0G4-MkC7WzQ_AtCgK0Pci7-pMhD6zyXG';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '', fatherName: '', mobile: '', dob: '', receipt: '',
    admissionDate: '', batch: '', fee: '', notes: '', photo: null
  });
  const [capture, setCapture] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result }); // base64
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, photo: imageSrc });
    setCapture(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, fatherName, mobile, dob } = formData;

    if (!name || !fatherName || !mobile || !dob) {
      alert("Please fill in Name, Father's Name, Mobile Number, and Date of Birth.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('students').insert([{
        name: formData.name,
        father_name: formData.fatherName,
        mobile: formData.mobile,
        dob: formData.dob,
        receipt: formData.receipt,
        admission_date: formData.admissionDate,
        batch: formData.batch,
        fee: formData.fee,
        notes: formData.notes,
        photo: formData.photo // base64 string
      }]);

      if (error) throw error;

      alert('✅ Data inserted successfully in Supabase!');
      setFormData({
        name: '', fatherName: '', mobile: '', dob: '', receipt: '',
        admissionDate: '', batch: '', fee: '', notes: '', photo: null
      });
    } catch (error) {
      console.error('Error inserting data:', error.message);
      alert('❌ Error inserting data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4 max-w-md mx-auto">
      {/* All Input Fields as before */}
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

      <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default StudentForm;
